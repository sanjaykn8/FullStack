// app2/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;
const DATA_FILE = path.join(__dirname, 'submissions.txt');

app.get('/', (req, res) => {
  // read file asynchronously
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.type('html').send('<h3>No submissions yet.</h3>');
      }
      console.error('Read error:', err);
      return res.status(500).send('Failed to read data.');
    }

    // Render simple HTML table from lines
    const rows = data
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(line => {
        // format: ISO | name | message
        const parts = line.split(' | ').map(s => escapeHtml(s));
        return `<tr><td>${parts[0]||''}</td><td>${parts[1]||''}</td><td>${parts[2]||''}</td></tr>`;
      })
      .join('\n');

    res.type('html').send(`
      <h2>Submissions</h2>
      <table border="1" cellpadding="6" cellspacing="0">
        <thead><tr><th>Time</th><th>Name</th><th>Message</th></tr></thead>
        <tbody>
          ${rows || '<tr><td colspan="3">No entries</td></tr>'}
        </tbody>
      </table>
      <p><a href="/">Refresh</a></p>
    `);
  });
});

function escapeHtml(s) {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

app.listen(PORT, () => {
  console.log(`App2 listening on http://localhost:${PORT}/`);
});