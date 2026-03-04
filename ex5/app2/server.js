// app2/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;
const DATA_FILE = path.join(__dirname, 'submissions.txt');

app.get('/', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.send('<h3>No submissions yet.</h3>');
      }
      return res.status(500).send('Error reading file.');
    }

    // Split blocks by separator
    const blocks = data.split('------------------------------')
                       .map(b => b.trim())
                       .filter(b => b.length > 0);

    const rows = blocks.map(block => {
      const lines = block.split('\n');

      const obj = {};
      lines.forEach(line => {
        const [key, ...rest] = line.split(':');
        if (key && rest.length) {
          obj[key.trim()] = rest.join(':').trim();
        }
      });

      return `
        <tr>
          <td>${escapeHtml(obj.Time || '')}</td>
          <td>${escapeHtml(obj.Name || '')}</td>
          <td>${escapeHtml(obj.Gender || '')}</td>
          <td>${escapeHtml(obj.DOB || '')}</td>
          <td>${escapeHtml(obj.Email || '')}</td>
          <td>${escapeHtml(obj.Phone || '')}</td>
          <td>${escapeHtml(obj.Description || '')}</td>
        </tr>
      `;
    }).join('');

    res.send(`
      <h2>Stored Submissions</h2>
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Time</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${rows || '<tr><td colspan="7">No Data</td></tr>'}
        </tbody>
      </table>
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
  console.log(`App2 running at http://localhost:${PORT}`);
});