const db = require('../../db');
const logic = require('./catalog.logic')(db);

const addDrinksToCatalog = async (root, { input }) => {
  return await logic.add(input);
};

const removeDrinksFromCatalog = async (root, { input }) => {
  return await logic.remove(input);
};

module.exports = {
  Mutation: {
    addDrinksToCatalog,
    removeDrinksFromCatalog
  }
};
