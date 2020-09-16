const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = Router();
const db = require('../db');

const createToken = () => {
  return jwt.sign({}, 'secret', { expiresIn: '1h' });
};

router.post('/login', (request, response, next) => {
  const email = request.body.email;
  const password = request.body.password.toString();
  // Check if user login is valid
  db.getDatabase()
    .db()
    .collection('users')
    .findOne({ email: email })
    .then(userDocument => {
      return bcrypt.compare(password, userDocument.password);
    })
    .then(result => {
      // If yes, create token and return it to client
      if (!result) {
        throw Error();
      }
      const token = createToken();
      response.status(200).json({ token: token, message: 'Authentication succeed', user: { email: email } });
    })
    .catch(error => {
      response
        .status(401)
        .json({ message: 'Authentication failed, invalid username or password.' });
    });


});

// to create a unique email can create an index into terminal
// db.users.createIndex({email: 1}, {unique: true})

router.post('/signup', (request, response, next) => {
  const email = request.body.email;
  const password = request.body.password.toString();
  // Hash password before storing it in database => Encryption at Rest
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      // Store hashedPassword in database
      db.getDatabase()
        .db()
        .collection('users')
        .insertOne({
          email: email,
          password: hashedPassword
        })
        .then(result => {
          const token = createToken();
          response.status(201).json({ token: token, user: { email: email } });
        })
        .catch(error => {
          console.log(error);
          response.status(500).json({ message: 'Creating the user failed.' });
        });
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: 'Creating the user failed.' });
    });
});

module.exports = router;
