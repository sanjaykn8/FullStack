// http_server.js
// Usage: node http_server.js
const http = require('http');

const PORT = 8081;

function countText(text) {
  const trimmed = text.trim();
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  return { words, chars, charsNoSpaces };
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/count') {
    let body = '';

    req.setEncoding('utf8');
    req.on('data', (chunk) => { body += chunk; });

    req.on('end', () => {
      // If JSON was sent, extract message field optionally
      let message = body;
      const ct = (req.headers['content-type'] || '').split(';')[0].trim();

      if (ct === 'application/json') {
        try {
          const parsed = JSON.parse(body);
          if (typeof parsed === 'object' && parsed !== null && typeof parsed.message === 'string') {
            message = parsed.message;
          } else {
            // fallback: use JSON string representation
            message = JSON.stringify(parsed);
          }
        } catch (e) {
          // invalid JSON -> treat as raw text
        }
      }

      const counts = countText(message);
      const response = {
        success: true,
        messagePreview: message.slice(0, 200),
        counts
      };

      const payload = JSON.stringify(response);
      res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) });
      res.end(payload);
    });

    req.on('error', (err) => {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    });

    return;
  }

  // For other routes, show simple info
  if (req.method === 'GET' && req.url === '/') {
    const info = `
      <h3>POST /count</h3>
      <p>Send plain text body (text/plain) or JSON { "message": "..." } (application/json)</p>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(info);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`HTTP server listening on http://127.0.0.1:${PORT}`);
});