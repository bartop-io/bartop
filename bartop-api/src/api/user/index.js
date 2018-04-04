const restRouter = require('./user.restRouter');
const { schema, resolvers } = require('./user.graphqlRouter');

module.exports = {
  userRouter: restRouter,
  userSchema: schema,
  userResolvers: resolvers
};
