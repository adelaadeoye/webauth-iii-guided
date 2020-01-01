const bcrypt = require('bcryptjs');
const jwtVerify = require ('jsonwebtoken');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const { username,authorization } = req.headers;
  const verifiedToken= jwtVerify.verify(authorization, "is it a secret and is it safe")

  if (authorization && verifiedToken) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Ran into an unexpected error' });
      });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
