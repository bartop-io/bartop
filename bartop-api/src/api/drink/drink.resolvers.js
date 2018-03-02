const db = require('../../db/store');

const listDrinks = async () => {
  return await db.findAll('drinks');
};

module.exports = {
  Query: {
    listDrinks
  }
};
