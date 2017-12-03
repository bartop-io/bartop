const asyncMiddleware = require('../../utils/asyncMiddleware');

module.exports = db => {
  const list = asyncMiddleware(async (req, res, next) => {
    const drinks = await db.findAll('drinks');
    res.json(drinks);
  });

  return { list };
};
