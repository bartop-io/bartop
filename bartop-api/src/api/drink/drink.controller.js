const db = require('../../db');
const logic = require('./drink.logic')(db);
const asyncMiddleware = require('../../utils/asyncMiddleware');

module.exports.list = asyncMiddleware(async (req, res, next) => {
  const drinks = await logic.list();
  res.status(200).json({ items: drinks });
});
