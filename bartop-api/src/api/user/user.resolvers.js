const db = require('../../db');
const logic = require('./user.logic')(db);

const listUsers = async () => {
  return await logic.list();
};

const getUserById = async (root, { id }) => {
  return await logic.get(id);
};

const createUser = async (root, { input }) => {
  return await logic.create(input);
};

module.exports = {
  Query: {
    listUsers,
    getUserById
  },
  Mutation: {
    createUser
  }
};
