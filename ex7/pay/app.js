const express = require('express');
const path = require('path');

const app = express();
const PORT = 3155;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function fmt(value) {
  return Number(value).toFixed(2);
}

app.get('/', (req, res) => {
  res.render('index', { result: null, form: {}, error: null });
});

app.post('/payroll', (req, res) => {
  const { employeeName, eid, designation, basicPay } = req.body;
  const basic = Number(basicPay);

  if (!employeeName || !eid || !designation || Number.isNaN(basic) || basic < 0) {
    return res.render('index', {
      result: null,
      form: req.body,
      error: 'Enter valid employee details and a valid basic pay.'
    });
  }

  const hra = basic * 0.20;
  const da = basic * 0.10;
  const ta = basic * 0.05;
  const pf = basic * 0.08;
  const grossPay = basic + hra + da + ta;
  const netPay = grossPay - pf;

  res.render('index', {
    error: null,
    form: req.body,
    result: {
      employeeName,
      eid,
      designation,
      basicPay: fmt(basic),
      hra: fmt(hra),
      da: fmt(da),
      ta: fmt(ta),
      pf: fmt(pf),
      grossPay: fmt(grossPay),
      netPay: fmt(netPay)
    }
  });
});

app.listen(PORT, () => {
  console.log(`Payroll app running at http://localhost:${PORT}`);
});