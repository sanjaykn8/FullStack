const express = require('express');
const path = require('path');
const Nano = require('nano');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

const nano = Nano('http://admin:%24%40njayKN8@localhost:5984');
const db = nano.db.use('railway');

// Home
app.get('/', (req, res) => res.render('index'));

// Book ticket
app.post('/book', async (req, res) => {
  const { pnr, source, dest, date, name } = req.body;

  if (!pnr || !source || !dest || !date || !name) {
    return res.render('index', { error: 'All fields are required.' });
  }

  if (new Date(date) <= new Date()) {
    return res.render('index', { error: 'Date must be in the future.' });
  }

  try {
    await db.insert({ _id: pnr, source, dest, date, name });
    res.redirect('/');
  } catch (err) {
    if (err.statusCode === 409) {
      res.render('index', { error: `PNR "${pnr}" already exists.` });
    } else {
      res.render('index', { error: 'Could not book ticket: ' + err.message });
    }
  }
});

// Cancel ticket
app.post('/cancel', async (req, res) => {
  try {
    const doc = await db.get(req.body.pnr);
    await db.destroy(doc._id, doc._rev);
    res.redirect('/');
  } catch (err) {
    res.render('index', { error: 'PNR not found or could not be cancelled.' });
  }
});

// View chart
app.get('/chart', async (req, res) => {
  const data = await db.list({ include_docs: true });
  const tickets = data.rows.map(r => r.doc).filter(d => !d._id.startsWith('_'));
  res.json(tickets);
});

// Update destination
app.post('/update', async (req, res) => {
  try {
    const doc = await db.get(req.body.pnr);
    doc.dest = req.body.dest;
    await db.insert(doc);
    res.redirect('/');
  } catch (err) {
    res.render('index', { error: 'PNR not found or could not be updated.' });
  }
});

app.listen(3000, () => console.log('Railway system running on http://localhost:3000'));
