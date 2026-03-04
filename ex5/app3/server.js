// app3/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3003;

const SAVE_PATH = path.join(__dirname, 'received-msg.txt');

// Serve upload page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client.html'));
});

// Upload endpoint (stream-based -> client readable stream piped to server file)
app.post('/upload', (req, res) => {
  const writeStream = fs.createWriteStream(SAVE_PATH, { flags: 'w' });

  req.on('error', (err) => {
    console.error('Request error:', err);
    writeStream.destroy();
    // connection may be half-closed; ensure response if possible
    try { res.status(500).send('Request stream error'); } catch (_) {}
  });

  writeStream.on('error', (err) => {
    console.error('Write error:', err);
    try { res.status(500).send('File write error'); } catch (_) {}
  });

  writeStream.on('finish', () => {
    res.send('Text file uploaded successfully using stream.');
  });

  // Pipe request body directly to file (efficient, no full-buffering)
  req.pipe(writeStream);
});

// Download endpoint (server-readable stream -> response -> client)
app.get('/download', (req, res) => {
  fs.stat(SAVE_PATH, (err, stat) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).send('No file available for download.');
      }
      console.error('Stat error:', err);
      return res.status(500).send('Server error');
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="received-msg.txt"');
    res.setHeader('Content-Length', stat.size);

    const readStream = fs.createReadStream(SAVE_PATH);

    readStream.on('error', (streamErr) => {
      console.error('Read stream error:', streamErr);
      // cannot reliably send headers now if streaming already started
      try { res.status(500).end('File read error'); } catch (_) {}
    });

    // Pipe server file stream to response (efficient, chunked)
    readStream.pipe(res);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});