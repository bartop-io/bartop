module.exports = `
type User {
  id: String,
  auth0Id: String
}

input UserInput {
  auth0Id: String
}

type Query {
  listUsers: [User]
}

type Mutation {
  createUser(newUser: UserInput!): User!
}`;
