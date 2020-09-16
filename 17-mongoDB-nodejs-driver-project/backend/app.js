const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use('/public', express.static(path.join('backend/public')));

app.use((request, response, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/products', productRoutes);
app.use('/', authRoutes);


const port = process.env.PORT || 3100;

db.initDatabase((error, db) => {
  if (error) {
    console.log(error);
  } else {
    app.listen(port, () => console.log(`Server started on ${ port }`));
  }
});

