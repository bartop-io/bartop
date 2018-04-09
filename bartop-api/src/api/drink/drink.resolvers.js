const r = require('../../db');

const listDrinks = async () => {
  return await r.table('drinks');
};

module.exports = {
  Query: {
    listDrinks
  }
};
