const db = require('../../db');
const logic = require('./catalog.logic')(db);

const replaceCatalog = async (root, { input }) => {
  return await logic.replace(input);
};

const addDrinkToCatalog = async (root, { input }) => {
  return await logic.add(input);
};

const removeDrinkFromCatalog = async (root, { input }) => {
  return await logic.remove(input);
};

module.exports = {
  Mutation: {
    replaceCatalog,
    addDrinkToCatalog,
    removeDrinkFromCatalog
  }
};
