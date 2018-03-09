module.exports = `
type User {
  id: String,
  authoId: String
}

input UserInput {
  authoId: String
}

type Query {
  listUsers: [User]
}

type Mutation {
  createUser(newUser: UserInput!): User!
}`;
