const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .then(user => res.send(user))
      .catch(next);
  })
  .put('/', (req, res, next) => {
    User
      .replaceById(req.body)
      .then(user => res.send(user))
      .catch(next);
  });
