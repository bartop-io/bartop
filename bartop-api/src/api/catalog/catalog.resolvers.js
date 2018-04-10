const db = require('../../db');
const logic = require('./catalog.logic')(db);

const createCatalog = async (root, { input }) => {
  return await logic.create(input);
};

module.exports = {
  Mutation: {
    createCatalog
  }
};
