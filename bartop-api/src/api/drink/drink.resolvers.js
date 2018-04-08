const db = require('../../db');
const logic = require('./drink.logic')(db);

const listDrinks = async () => {
  return await logic.list();
};

module.exports = {
  Query: {
    listDrinks
  }
};
