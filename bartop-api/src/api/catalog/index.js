const { schema, resolvers } = require('./catalog.graphqlRouter');

module.exports = {
  catalogSchema: schema,
  catalogResolvers: resolvers
};
