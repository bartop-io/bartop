module.exports = `
# Data model representing a user in BarTop
type User {

  # Database-generated key to identify the User
  id: ID,

  # User ID provided by and used to interact with Auth0
  auth0Id: String

  # Catalog containing all drinks a user can make
  catalog: [ID] # todo: change to [Drink] and write a resolver to handle it
}

# Input type containing data needed to create a new User
input CreateUserInput {

  # User ID provided by and used to interact with Auth0
  auth0Id: String!
}

# The root Query for BarTop's GraphQL interface
type Query {
  # Returns a list of all users
  listUsers: [User]
}

# The root Mutation for BarTop's GraphQL interface
type Mutation {
  # Creates a new user
  createUser(input: CreateUserInput!): User!
}`;
