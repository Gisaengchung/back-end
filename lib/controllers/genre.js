const { Router } = require('express');
const Genre = require('../models/Genre');

module.exports = Router()
  .get('/', (req, res, next) => {
    Genre
      .find()
      .then(user => res.send(user))
      .catch(next);
  });
