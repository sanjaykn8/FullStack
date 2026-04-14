const express = require('express');
const path = require('path');

const app = express();
const PORT = 3105;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const items = [
  {
    "id": 1,
    "name": "Burger",
    "price": 120,
    "image": "burger.jpg",
    "addtocart": "/cart"
  },
  {
    "id": 2,
    "name": "Pizza",
    "price": 250,
    "image": "pizza.jpg",
    "addtocart": "/cart"
  },
  {
    "id": 3,
    "name": "Sandwich",
    "price": 90,
    "image": "sandwich.jpg",
    "addtocart": "/cart"
  },
  {
    "id": 4,
    "name": "Pasta",
    "price": 180,
    "image": "pasta.jpg",
    "addtocart": "/cart"
  },
  {
    "id": 5,
    "name": "Juice",
    "price": 60,
    "image": "juice.jpg",
    "addtocart": "/cart"
  }
]


let cart = [];

function totalAmount(list) {
  return list.reduce((sum, item) => sum + item.subtotal, 0);
}

app.get('/', (req, res) => {
  res.redirect('/items');
});

app.get('/items', (req, res) => {
  res.render('items', {
    items,
    cart,
    cartTotal: totalAmount(cart),
    message: req.query.message || null
  });
});

app.post('/cart', (req, res) => {
  const itemId = Number(req.body.itemId);
  const qty = Number(req.body.qty) || 1;
  const item = items.find(i => i.id === itemId);

  if (!item || qty < 1) {
    return res.redirect('/items?message=' + encodeURIComponent('Invalid item or quantity.'));
  }

  const subtotal = item.price * qty;

  cart.push({
    id: item.id,
    name: item.name,
    price: item.price,
    qty,
    subtotal
  });

  res.redirect('/items?message=' + encodeURIComponent(`${item.name} added to cart.`));
});

app.post('/order', (req, res) => {
  const customerName = req.body.customerName;

  if (!customerName) {
    return res.redirect('/items?message=' + encodeURIComponent('Customer name is required.'));
  }

  if (cart.length === 0) {
    return res.redirect('/items?message=' + encodeURIComponent('Cart is empty.'));
  }

  const order = {
    orderId: 'ORD' + Date.now(),
    customerName,
    items: cart,
    total: totalAmount(cart)
  };

  cart = [];

  res.render('order', { order });
});

app.listen(PORT, () => {
  console.log(`Order app running at http://localhost:${PORT}`);
});