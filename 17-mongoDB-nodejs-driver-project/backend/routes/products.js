const Router = require('express').Router;
const mongodb = require('mongodb');
const router = Router();

const db = require('../db');
// const products = require('../dummy_data');
// convert into decimal128 number
const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

// Get list of products 
router.get('/', (request, response, next) => {
  // Return a list of dummy products
  // Later, this data will be fetched from MongoDB
  // const queryPage = request.query.page;
  // const pageSize = 5;
  // let resultProducts = [...products];
  // if (queryPage) {
  //   resultProducts = products.slice((queryPage - 1) * pageSize, queryPage * pageSize);
  // }
  // response.json(resultProducts);
  const queryPage = request.query.page;
  const pageSize = 1;
  const products = [];
  // to want to add an index got to the terminal
  db.getDatabase()
    .db()
    .collection('products')
    .find()
    .sort({ price: -1 })
    .skip((queryPage - 1) * pageSize)
    .limit(pageSize)
    .forEach(productDocument => {
      productDocument.price = productDocument.price.toString();
      products.push(productDocument);
    })
    .then(result => {
      response.status(200).json(products);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: 'An error occurred.' });
    });

});

// Get single product
router.get('/:id', (request, response, next) => {
  db.getDatabase()
    .db()
    .collection('products')
    .findOne({ _id: new ObjectId(request.params.id) })
    .then(productDocument => {
      productDocument.price = productDocument.price.toString();
      response.status(200).json(productDocument);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: 'An error occurred.' });
    });
  // const product = products.find(product => product._id === request.params.id);
  // response.json(product);
});

// Add new product
// Requires logged in user
router.post('', (request, response, next) => {
  const newProduct = {
    name: request.body.name,
    description: request.body.description,
    // price: parseFloat(request.body.price), // store this as 128bit decimal in MongoDB
    // can also same thing done by mongoDb
    price: Decimal128.fromString(request.body.price.toString()),
    image: request.body.image
  };

  db.getDatabase()
    .db()
    .collection('products')
    .insertOne(newProduct)
    .then(result => {
      response.status(201).json({ message: 'Product added', productId: result.insertedId });
    })
    .catch(err => {
      console.log(err);
      response.status(500).json({ message: 'An error occurred.' });
    });
});
// Edit existing product
// Requires logged in user
router.patch('/:id', (request, response, next) => {
  const updatedProduct = {
    name: request.body.name,
    description: request.body.description,
    // price: parseFloat(request.body.price), // store this as 128bit decimal in MongoDB
    // can also same thing done by mongoDb
    price: Decimal128.fromString(request.body.price.toString()),
    image: request.body.image
  };
  db.getDatabase()
    .db()
    .collection('products')
    .updateOne({ _id: new ObjectId(request.params.id) }, { $set: updatedProduct })
    .then(updatedProduct => {
      console.log(updatedProduct);
      response.status(200).json({ message: 'Product updated', productId: request.params.id });
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: 'An error occurred.' });
    });
});

// Delete a product
// Requires logged in user
router.delete('/:id', (request, response, next) => {
  db.getDatabase()
    .db()
    .collection('products')
    .deleteOne({ _id: new ObjectId(request.params.id) })
    .then(productDeleted => {
      response.status(200).json({ message: 'Product deleted' });
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: 'An error occurred.' });
    })
});

module.exports = router;
