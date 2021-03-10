const { Router } = require('express');
const State = require('../models/State');

module.exports = Router()
  .get('/', (req, res, next) => {
    State
      .find()
      .then(user => res.send(user))
      .catch(next);
  });
