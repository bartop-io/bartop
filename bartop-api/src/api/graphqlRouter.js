const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const config = require('../../config');
const { drinkSchema, drinkResolvers } = require('./drink');

const schema = makeExecutableSchema({
  typeDefs: [drinkSchema],
  resolvers: drinkResolvers
});

// export the graphql route and enable graphiql for development
module.exports = graphqlHTTP({
  schema: schema,
  graphiql: config.env === 'development',
  pretty: true
});
