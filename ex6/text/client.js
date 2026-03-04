// http_client.js
// Usage: node http_client.js "your message here"
const http = require('http');

const message = process.argv.slice(2).join(' ') || 'Hello from http_client';

const options = {
  hostname: 'localhost',
  port: 8081,
  path: '/count',
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
    'Content-Length': Buffer.byteLength(message)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(body);
      console.log('Response:', parsed);
    } catch (e) {
      console.log('Raw response:', body);
    }
  });
});

req.on('error', (err) => {
  console.error('Request error:', err.message);
});

req.write(message);
req.end();