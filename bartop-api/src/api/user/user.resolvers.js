const r = require('../../db');

const listUsers = async () => {
  return await r.table('users');
};

const createUser = async (root, { newUser }) => {
  // just return the generated ID for now
  const response = await r.table('users').insert(newUser);
  return response.generated_keys[0];
};

module.exports = {
  Query: {
    listUsers
  },
  Mutation: {
    createUser
  }
};
