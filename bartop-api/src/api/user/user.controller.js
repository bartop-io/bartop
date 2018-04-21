const db = require('../../db');
const logic = require('./user.logic')(db);
const model = require('./user.model');
const asyncMiddleware = require('../../utils/asyncMiddleware');
const validateInput = require('../../utils/validators');
const throwError = require('../../utils/errorCreator');

module.exports.create = asyncMiddleware(async (req, res, next) => {
  validateInput.onPost(req, model);
  const result = await logic.create(req.body);
  res.status(201).json(result);
});

module.exports.list = asyncMiddleware(async (req, res, next) => {
  const users = await logic.list();
  res.status(200).json({ items: users });
});

module.exports.get = asyncMiddleware(async (req, res, next) => {
  const userId = req.params.id;
  const user = await logic.get(userId);
  if (user === null) {
    throwError.notFound(userId);
  } else {
    res.status(200).json(user);
  }
});
