module.exports = `
# Data model representing a user in BarTop
type User {

  # Database-generated key to identify the User
  id: ID,

  # User ID provided by and used to interact with Auth0
  auth0Id: String
}

# Input type containing data needed to create a new User
input UserInput {

  # # User ID provided by and used to interact with Auth0
  auth0Id: String
}

# The root Query for BarTop's GraphQL interface
type Query {
  # Returns a list of all users
  listUsers: [User]
}

# The root Mutation for BarTop's GraphQL interface
type Mutation {
  # Creates a new user
  createUser(newUser: UserInput!): User!
}`;
