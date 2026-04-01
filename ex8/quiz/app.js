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
  saveUninitialized: true
}));

// Login page
app.get('/', (req, res) => res.render('login'));

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const [user] = await db.query(
    'SELECT * FROM users WHERE email=? AND password=?',
    [email, password]
  );

  if (user.length) {
    req.session.user = user[0];
    res.redirect('/categories');
  } else {
    res.send('Invalid login');
  }
});

// Categories
app.get('/categories', (req, res) => {
  res.render('categories');
});

// Start quiz
app.get('/quiz/:category', async (req, res) => {
  const [questions] = await db.query(
    'SELECT * FROM questions WHERE category=? LIMIT 5',
    [req.params.category]
  );

  res.render('quiz', { questions });
});

// Submit quiz
app.post('/submit', async (req, res) => {
  let score = 0;

  const answers = req.body;
  const [questions] = await db.query('SELECT * FROM questions');

  questions.forEach(q => {
    if (answers[q.id] == q.correct) score += 10;
    else score -= 0.25;
  });

  await db.query(
    'UPDATE users SET score=? WHERE id=?',
    [score, req.session.user.id]
  );

  res.render('result', { score });
});

app.listen(3000, () => console.log('Quiz running on http://localhost:3000'));