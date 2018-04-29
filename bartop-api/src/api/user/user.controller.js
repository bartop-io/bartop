const db = require('../../db');
const logic = require('./user.logic')(db);
const model = require('./user.model');
const asyncMiddleware = require('../../utils/asyncMiddleware');
const validateInput = require('../../utils/validators');

module.exports.create = asyncMiddleware(async (req, res, next) => {
  validateInput.onPost(req, model);
  const result = await logic.create(req.body);
  res.status(201).json(result);
});

module.exports.list = asyncMiddleware(async (req, res, next) => {
  const users = await logic.list();
  res.status(200).json({ items: users });
});
