module.exports = `
# Input type containing data needed to create a catalog for a user
input CreateCatalogInput {
  userId: ID!
  drinkIds: [ID]!
}

extend type Mutation {
  # Creates a new catalog for a user
  createCatalog(input: CreateCatalogInput!): User!
}`;
