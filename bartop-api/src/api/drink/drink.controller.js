const asyncMiddleware = require('../../utils/asyncMiddleware');

module.exports = r => {
  const list = asyncMiddleware(async (req, res, next) => {
    const drinks = await r.table('drinks');
    res.status(200).json({ items: drinks });
  });

  return { list };
};
