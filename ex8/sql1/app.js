const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// List
app.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM contacts');
  res.render('index', { contacts: rows });
});

// Add form
app.get('/add', (req, res) => res.render('add'));

// Create
app.post('/add', async (req, res) => {
  const { name, phone, address } = req.body;
  await db.query(
    'INSERT INTO contacts(name, phone, address) VALUES (?, ?, ?)',
    [name, phone, address]
  );
  res.redirect('/');
});

// Edit form (by phone)
app.get('/edit/:phone', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM contacts WHERE phone=?',
    [req.params.phone]
  );
  res.render('edit', { contact: rows[0] });
});

// Update (by phone)
app.post('/edit/:phone', async (req, res) => {
  const { name, address } = req.body;
  await db.query(
    'UPDATE contacts SET name=?, address=? WHERE phone=?',
    [name, address, req.params.phone]
  );
  res.redirect('/');
});

// Delete (by phone)
app.get('/delete/:phone', async (req, res) => {
  await db.query('DELETE FROM contacts WHERE phone=?', [req.params.phone]);
  res.redirect('/');
});

app.listen(3001, () => console.log('Running on http://localhost:3001'));