const db = require('../../db/store');
const logic = require('./catalog.logic')(db);

const createCatalog = async (root, { newCatalog }) => {
  return await logic.create(newCatalog);
};

module.exports = {
  Mutation: {
    createCatalog
  }
};
