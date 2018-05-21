const { makeExecutableSchema } = require('graphql-tools');
const graphqlHTTP = require('express-graphql');
const merge = require('lodash.merge');
const config = require('../../config');
const { userSchema, userResolvers } = require('./user');
const { drinkSchema, drinkResolvers } = require('./drink');
const { catalogSchema, catalogResolvers } = require('./catalog');

const baseSchema = `
  schema {
    query: Query,
    mutation: Mutation
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [baseSchema, drinkSchema, userSchema, catalogSchema],
  resolvers: merge({}, drinkResolvers, userResolvers, catalogResolvers)
});

// export the graphql route and enable graphiql for development
module.exports = graphqlHTTP({
  schema: schema,
  graphiql: config.env === 'development',
  pretty: true
});
