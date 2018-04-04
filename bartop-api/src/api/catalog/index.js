const restRouter = require('./catalog.restRouter');
const { schema, resolvers } = require('./catalog.graphqlRouter');

module.exports = {
  catalogRouter: restRouter,
  catalogSchema: schema,
  catalogResolvers: resolvers
};
