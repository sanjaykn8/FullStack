// app1/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'submissions.txt');

app.use(express.urlencoded({ extended: false }));

// Serve Form
app.get('/', (req, res) => {
  res.type('html').send(`
    <html>
    <head>
      <title>User Registration</title>
      <style>
        body { font-family: Arial; padding: 40px; background: #f4f4f4; }
        form { background: #fff; padding: 25px; border-radius: 8px; width: 400px; }
        label { display: block; margin-top: 12px; }
        input, textarea { width: 100%; padding: 6px; margin-top: 4px; }
        .radio-group { margin-top: 6px; }
        button { margin-top: 15px; padding: 8px 12px; }
      </style>
    </head>
    <body>
      <h2>User Registration Form</h2>
      <form method="POST" action="/submit">
        
        <label>Name:
          <input type="text" name="name" required>
        </label>

        <label>Gender:</label>
        <div class="radio-group">
          <input type="radio" name="gender" value="Male" required> Male
          <input type="radio" name="gender" value="Female" required> Female
        </div>

        <label>Date of Birth:
          <input type="date" name="dob" required>
        </label>

        <label>Email:
          <input type="email" name="email" required>
        </label>

        <label>Phone Number:
          <input type="tel" name="phone" pattern="[0-9]{10}" required>
        </label>

        <label>Description:
          <textarea name="description" rows="4" required></textarea>
        </label>

        <button type="submit">Submit</button>
      </form>
    </body>
    </html>
  `);
});

// Handle Submission
app.post('/submit', (req, res) => {
  const { name, gender, dob, email, phone, description } = req.body;

  const entry = `
------------------------------
Time: ${new Date().toISOString()}
Name: ${name}
Gender: ${gender}
DOB: ${dob}
Email: ${email}
Phone: ${phone}
Description: ${description}
------------------------------
`;

  fs.appendFile(DATA_FILE, entry, (err) => {
    if (err) {
      console.error('Write error:', err);
      return res.status(500).send('Failed to save submission.');
    }

    res.send(`
      <h3>Data Saved Successfully</h3>
      <a href="/">Back to Form</a>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`App1 running at http://localhost:${PORT}`);
});