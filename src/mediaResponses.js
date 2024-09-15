const fs = require('fs');
const path = require('path');

const loadFile = (request, response, filePath, contentType) => {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
        return response.end('File not found');
      }
      return response.end(err);
    }

    let { range } = request.headers;
    if (!range) {
      range = 'bytes=0-';
    }

    const positions = range.replace(/bytes=/, '').split('-');
    let start = parseInt(positions[0], 10);
    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunksize = (end - start) + 1;

    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType, 
    });

    const stream = fs.createReadStream(filePath, { start, end });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });
    return stream;
  });
};

const getParty = (request, response) => {
  const filePath = path.resolve(__dirname, '../client/party.mp4');
  loadFile(request, response, filePath, 'video/mp4');
};

const getBling = (request, response) => {
  const filePath = path.resolve(__dirname, '../client/bling.mp3');
  loadFile(request, response, filePath, 'audio/mpeg');
};

const getBird = (request, response) => {
  const filePath = path.resolve(__dirname, '../client/bird.mp4');
  loadFile(request, response, filePath, 'video/mp4');
};

module.exports = {
  getParty,
  getBling,
  getBird,
};
