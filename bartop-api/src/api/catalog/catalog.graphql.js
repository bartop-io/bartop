module.exports = `

# Input type containing data needed to create a catalog for a user
input ReplaceCatalogInput {

  # The catalog will be replaced for the User with this unique ID
  userId: ID!

  # List of IDs that correspond to Drink objects in the DB
  drinkIds: [ID]!
}

# Return type of replaceCatalog
type ReplaceCatalogPayload {

  # The new Catalog object for the User
  catalog: [ID] # this should perhaps resolve the drinks

  # A flag that will be 'true' if the given Catalog is identical to the existing Catalog, and 'null' otherwise.
  unchanged: Boolean
}


# Input type containing data needed to add a drink to a user's catalog
input AddDrinkToCatalogInput {

  # The unique ID of the user that corresponds to the catalog to be updated
  userId: ID!

  # The unique ID of the drink to be added to the catalog
  drinkId: ID!
}

# Return type of addDrinkToCatalog
type AddDrinkToCatalogPayload {

  # The Drink object added to the catalog
  drink: Drink

  # A flag that will be 'true' if the given drink is already present in the catalog, and 'null' otherwise.
  unchanged: Boolean
}


# Input type containing data needed to remove a drink from a user's catalog
input RemoveDrinkFromCatalogInput {

  # The unique ID of the user that corresponds to the catalog to be updated
  userId: ID!

  # The unique ID of the drink to be removed from the catalog
  drinkId: ID!
}

# Return type of removeDrinkFromCatalog
type RemoveDrinkFromCatalogPayload {

  # The Drink object removed from the catalog
  drink: Drink

  # A flag that will be 'true' if the given drink was already absent from the catalog, and 'null' otherwise.
  unchanged: Boolean
}


extend type Mutation {

  # Completely replaces an existing catalog with a new one. Should be used to initialize catalogs (by replacing empty ones).
  replaceCatalog(input: ReplaceCatalogInput!): ReplaceCatalogPayload!

  # Add a single drink to a user's catalog, by ID
  addDrinkToCatalog(input: AddDrinkToCatalogInput!): AddDrinkToCatalogPayload!

  # Remove a single drink from a user's catalog, by ID
  removeDrinkFromCatalog(input: RemoveDrinkFromCatalogInput!): RemoveDrinkFromCatalogPayload!
}`;
