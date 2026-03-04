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

// Upload endpoint (stream-based)
app.post('/upload', (req, res) => {
  const writeStream = fs.createWriteStream(SAVE_PATH, { flags: 'w' });

  req.on('error', (err) => {
    console.error('Request error:', err);
    writeStream.destroy();
    res.status(500).send('Request stream error');
  });

  writeStream.on('error', (err) => {
    console.error('Write error:', err);
    res.status(500).send('File write error');
  });

  writeStream.on('finish', () => {
    res.send('msg.txt uploaded successfully using stream.');
  });

  // Pipe request body directly to file
  req.pipe(writeStream);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});