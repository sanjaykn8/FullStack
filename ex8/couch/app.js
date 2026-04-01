const express = require('express');
const path = require('path');
const Nano = require('nano');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

const nano = Nano('http://admin:password@localhost:5984');
const db = nano.db.use('railway');

// Home
app.get('/', (req, res) => res.render('index'));

// Book ticket
app.post('/book', async (req, res) => {
  const { pnr, source, dest, date, name } = req.body;

  if (new Date(date) <= new Date()) {
    return res.send('Date must be future');
  }

  await db.insert({
    _id: pnr,
    source,
    dest,
    date,
    name
  });

  res.redirect('/');
});

// Cancel ticket
app.post('/cancel', async (req, res) => {
  const doc = await db.get(req.body.pnr);
  await db.destroy(doc._id, doc._rev);
  res.redirect('/');
});

// View chart
app.get('/chart', async (req, res) => {
  const data = await db.list({ include_docs: true });
  const tickets = data.rows.map(r => r.doc);
  res.json(tickets);
});

// Update destination
app.post('/update', async (req, res) => {
  const doc = await db.get(req.body.pnr);
  doc.dest = req.body.dest;

  await db.insert(doc);
  res.redirect('/');
});

app.listen(3000, () => console.log('Railway system running'));