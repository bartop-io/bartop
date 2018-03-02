module.exports = `
type User {
  id: String
}

input UserInput {
  id: String
}

type Query {
  listUsers: [User]
}

type Mutation {
  createUser(newUser: UserInput!): User!
}`;
