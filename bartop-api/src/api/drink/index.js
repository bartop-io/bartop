const restRouter = require('./drink.restRouter');
const { schema, resolvers } = require('./drink.graphqlRouter');

module.exports = {
  drinkRouter: restRouter,
  drinkSchema: schema,
  drinkResolvers: resolvers
};
