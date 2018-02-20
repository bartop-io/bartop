const asyncMiddleware = require('../../utils/asyncMiddleware');

module.exports = db => {
  const list = asyncMiddleware(async (req, res, next) => {
    const drinks = await db.findAll('drinks');
    res.status(200).json({ items: drinks });
  });

  return { list };
};
