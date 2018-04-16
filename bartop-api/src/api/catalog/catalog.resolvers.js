const db = require('../../db');
const logic = require('./catalog.logic')(db);

const replaceCatalog = async (root, { input }) => {
  return await logic.replace(input);
};

module.exports = {
  Mutation: {
    replaceCatalog
  }
};
