const restRouter = require('./user.restRouter');
const { schema, resolvers } = require('./user.graphqlRouter');

module.exports = {
  usersRouter: restRouter,
  userSchema: schema,
  userResolvers: resolvers
};
