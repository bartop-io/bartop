const asyncMiddleware = require('../../utils/asyncMiddleware');

module.exports = db => {
  const create = asyncMiddleware(async (req, res, next) => {
    const newUser = { id: req.params.id };
    const createdUser = await db.create('users', newUser);
    res.status(201).json(createdUser);
  });

  return { create };
};
