module.exports = `

# Type........
type Menu {

  # ..
  id: ID!

  # .....
  name: String!

  # .....
  description: String 

  # .....
  drinks: [Drink]!
}

# Type used accross API for handled errors
type Error {

  # Message describing the error. Should be user friendly.
  message: String!

  # Optional array of IDs for Errors involving specific resources
  id: [ID]
}

# Input type containing data needed to create a menu
input CreateMenuInput {

  # The unique ID of the user that corresponds to the menu to be created
  userId: ID!

  # Name of the menu to be created
  name: String!

  # Optional description about the menu to be created
  description: String

  # The unique IDs of the drinks to be in the new menu
  drinkIds: [ID]!
}

# Return type of createMenu
type CreateMenuPayload {

  # ...
  menu: Menu!

  # Errors that occurred while executing the request
  errors: [Error]
}


extend type Mutation {

  # Create a menu......
  createMenu(input: CreateMenuInput!): CreateMenuPayload!

}`;
