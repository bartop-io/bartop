const db = require('../../db');
const logic = require('./catalog.logic')(db);

const replaceCatalog = async (root, { input }) => {
  return await logic.replace(input);
};

const addDrinkToCatalog = async (root, { input }) => {
  // need from input:
  // userid of catalog
  // drinkid to add

  // return:
  // the single drink, resolved
  return input;
};

const removeDrinkFromCatalog = async (root, { input }) => {
  // need from input:
  // userid of catalog
  // drinkid to remove

  // return:
  // the single drink, resolved
  return input;
};

module.exports = {
  Mutation: {
    replaceCatalog,
    addDrinkToCatalog,
    removeDrinkFromCatalog
  }
};
