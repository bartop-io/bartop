const db = require('../../db/store');

const listUsers = async () => {
  return await db.findAll('users');
};

const createUser = async (root, { newUser }) => {
  return await db.create('users', newUser);
};

module.exports = {
  Query: {
    listUsers
  },
  Mutation: {
    createUser
  }
};
