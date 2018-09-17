const db = require('../../db');
const logic = require('./menu.logic')(db);

const createMenu = async (root, { input }) => {
  return await logic.create(input);
};

module.exports = {
  Mutation: {
    createMenu
  }
};
