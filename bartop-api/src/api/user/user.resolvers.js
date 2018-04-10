const db = require('../../db');
const logic = require('./user.logic')(db);

const listUsers = async () => {
  return await logic.list();
};

const createUser = async (root, { input }) => {
  return await logic.create(input);
};

module.exports = {
  Query: {
    listUsers
  },
  Mutation: {
    createUser
  }
};
