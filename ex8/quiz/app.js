const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./db');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'quiz_secret',
  resave: false,
  saveUninitialized: false
}));

// Auth middleware
function requireLogin(req, res, next) {
  if (!req.session.user) return res.redirect('/');
  next();
}

// Login page
app.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/categories');
  res.render('login', { error: null });
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email=? AND password=?',
      [email, password]
    );
    if (rows.length) {
      req.session.user = rows[0];
      res.redirect('/categories');
    } else {
      res.render('login', { error: 'Invalid email or password.' });
    }
  } catch (err) {
    res.render('login', { error: 'Database error: ' + err.message });
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

// Categories
app.get('/categories', requireLogin, (req, res) => {
  res.render('categories', { user: req.session.user });
});

// Start quiz — store question IDs in session so submit can score correctly
app.get('/quiz/:category', requireLogin, async (req, res) => {
  const [questions] = await db.query(
    'SELECT * FROM questions WHERE category=? ORDER BY RAND() LIMIT 5',
    [req.params.category]
  );
  req.session.quizQuestions = questions.map(q => q.id);
  res.render('quiz', { questions, category: req.params.category });
});

// Submit quiz — only score against the 5 questions shown
app.post('/submit', requireLogin, async (req, res) => {
  const qids = req.session.quizQuestions || [];
  if (!qids.length) return res.redirect('/categories');

  const [questions] = await db.query(
    `SELECT * FROM questions WHERE id IN (${qids.map(() => '?').join(',')})`,
    qids
  );

  let score = 0;
  questions.forEach(q => {
    if (req.body[q.id] == q.correct) score += 10;
    else if (req.body[q.id]) score -= 0.25; // only deduct if answered
  });

  score = Math.round(score * 100) / 100;

  await db.query(
    'UPDATE users SET score=? WHERE id=?',
    [score, req.session.user.id]
  );

  req.session.quizQuestions = null;
  res.render('result', { score, total: questions.length * 10 });
});

app.listen(3000, () => console.log('Quiz running on http://localhost:3000'));
