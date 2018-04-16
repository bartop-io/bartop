const db = require('../../db');
const logic = require('./catalog.logic')(db);
const model = require('./catalog.model');
const asyncMiddleware = require('../../utils/asyncMiddleware');
const validateInput = require('../../utils/validators');

module.exports.replace = asyncMiddleware(async (req, res, next) => {
  validateInput.onPost(req, model);
  const result = await logic.replace(req.body);
  res.status(201).json(result);
});
