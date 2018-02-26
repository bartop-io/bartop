const restRouter = require('./drink.restRouter');
const { schema, resolvers } = require('./drink.graphqlRouter');

module.exports = {
  drinksRouter: restRouter,
  drinkSchema: schema,
  drinkResolvers: resolvers
};
