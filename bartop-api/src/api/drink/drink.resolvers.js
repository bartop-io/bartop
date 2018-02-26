const db = require('../../db/store');

const getDrinks = async () => {
  return await db.findAll('drinks');
};

module.exports = {
  Query: {
    drinks: getDrinks
  }
};
