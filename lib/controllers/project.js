const { Router } = require('express');
const Project = require('../models/Project');

module.exports = Router()
  .get('/:id', (req, res, next) => {
    Project
      .findById(req.params.id)
      .then(user => res.send(user))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Project
      .find()
      .then(user => res.send(user))
      .catch(next);
  })
  .put('/', (req, res, next) => {
    Project
      .replaceById(req.body)
      .then(user => res.send(user))
      .catch(next);
  })
  .post('/', (req, res, next) => {
    Project
      .insert(req.body)
      .then(user => res.send(user))
      .catch(next);
  });
