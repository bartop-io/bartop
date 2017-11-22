const asyncMiddleware = require('../../utils/asyncMiddleware');

module.exports = function(db) {
  const getAll = asyncMiddleware(async (req, res, next) => {
    const drinks = await db.findAll('drinks');
    res.json(drinks);
  });

  return { getAll };
};
