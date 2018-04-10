const db = require('../../db');
const logic = require('./user.logic')(db);

const listUsers = async () => {
  return await logic.list();
};

const createUser = async (root, { newUser }) => {
  return await logic.create(newUser);
};

module.exports = {
  Query: {
    listUsers
  },
  Mutation: {
    createUser
  }
};
