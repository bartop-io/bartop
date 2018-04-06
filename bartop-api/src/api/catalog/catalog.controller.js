const db = require('../../db');
const logic = require('./catalog.logic')(db);
const model = require('./catalog.model');
const asyncMiddleware = require('../../utils/asyncMiddleware');
const validateInput = require('../../utils/validators');

// create a new catalog
module.exports.create = asyncMiddleware(async (req, res, next) => {
  validateInput.onPost(req, model);
  const result = await logic.create(req.body);
  res.status(201).json(result);
});
