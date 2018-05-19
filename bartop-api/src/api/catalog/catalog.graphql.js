module.exports = `

type Error {
  message: String
}

# Input type containing data needed to add drinks to a user's catalog
input AddDrinksToCatalogInput {

  # The unique ID of the user that corresponds to the catalog to be updated
  userId: ID!

  # The unique IDs of the drinks to be added to the catalog
  drinkIds: [ID]!
}

# Return type of addDrinksToCatalog
type AddDrinksToCatalogPayload {

  # The Drink objects added to the catalog
  drinks: [Drink]

  # Errors that occurred while executing the request
  errors: [Error]
}


# Input type containing data needed to remove drinks from a user's catalog
input RemoveDrinksFromCatalogInput {

  # The unique ID of the user that corresponds to the catalog to be updated
  userId: ID!

  # The unique IDs of the drinks to be removed from the catalog
  drinkIds: [ID]!
}

# Return type of removeDrinksFromCatalog
type RemoveDrinksFromCatalogPayload {

  # The Drink objects removed from the catalog
  drinks: [Drink]

  # Errors that occurred while executing the request
  errors: [Error]
}


extend type Mutation {

  # Add a single drink to a user's catalog, by ID
  addDrinksToCatalog(input: AddDrinksToCatalogInput!): AddDrinksToCatalogPayload!

  # Remove a single drink from a user's catalog, by ID
  removeDrinksFromCatalog(input: RemoveDrinksFromCatalogInput!): RemoveDrinksFromCatalogPayload!
}`;
