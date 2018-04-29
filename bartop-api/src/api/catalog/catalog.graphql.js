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

  # The new Catalog object for the User. Will be 'null' if Catalog is unchanged
  catalog: [Drink]

  # A flag that will be 'true' if the given Catalog is identical to the existing Catalog, and 'null' otherwise
  unchanged: Boolean
}

extend type Mutation {

  # Completely replaces an existing catalog with a new one. Should be used to initialize catalogs (by replacing empty ones)
  replaceCatalog(input: ReplaceCatalogInput!): ReplaceCatalogPayload!
}`;
