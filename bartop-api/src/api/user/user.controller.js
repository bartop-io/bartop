const model = require('./user.model');
const asyncMiddleware = require('../../utils/asyncMiddleware');
const validateInput = require('../../utils/validators');

module.exports = r => {
  const create = asyncMiddleware(async (req, res, next) => {
    validateInput.onPost(req, model);

    const response = await r.table('users').insert(req.body);
    // just return the generated ID for now
    res.status(201).json(response.generated_keys[0]);
  });

  const list = asyncMiddleware(async (req, res, next) => {
    const users = await r.table('users');
    res.status(200).json({ items: users });
  });

  return { create, list };
};
