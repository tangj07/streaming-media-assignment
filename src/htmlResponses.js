const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const bird = fs.readFileSync(`${__dirname}/../client/client2.html`);
const bling = fs.readFileSync(`${__dirname}/../client/client3.html`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getPage2 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(bird);
  response.end();
};

const getPage3 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(bling);
  response.end();
};

module.exports = {
  getIndex,
  getPage2,
  getPage3,
};
