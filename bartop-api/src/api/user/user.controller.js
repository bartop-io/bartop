const model = require('./user.model');
const asyncMiddleware = require('../../utils/asyncMiddleware');
const validateInput = require('../../utils/validators');

module.exports = db => {
  const create = asyncMiddleware(async (req, res, next) => {
    validateInput.onPost(req, model);

    const createdUser = await db.create('users', req.body);
    res.status(201).json(createdUser);
  });

  const list = asyncMiddleware(async (req, res, next) => {
    const users = await db.findAll('users');
    res.status(200).json({ items: users });
  });

  return { create, list };
};
