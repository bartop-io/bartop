const db = require('../../db');
const logic = require('./user.logic')(db);

const listUsers = async () => {
  return await logic.list();
};

const getUserById = async (root, { id }) => {
  return await logic.get(id);
};

const createUser = async (root, { input }) => {
  const newUser = await logic.create(input);
  return { user: newUser };
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
