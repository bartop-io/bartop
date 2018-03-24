module.exports = `
# Data model representing a cocktail in BarTop
type Drink {

  # Database-generated key to identify the Drink
  id: ID

  # Name of the cocktail
  name: String

  # Brief summary describing the cocktail
  description: String

  # List of instructions describing how to make the cocktail
  instructions: [String]

  # List of ingredients used to make the cocktail
  ingredients: [Ingredient]
}

# Describes an ingredient to be used in a cocktail
type Ingredient {

  # The specific ingredient to use (whiskey, simple syrup, etc)
  ingredient: String

  # Amount object describing how much of the ingredient to use
  amount: Amount
}

# Describes the amount of an ingredient to use
type Amount {

  # Numeric quantity of the amount to use
  quantity: Float

  # Unit that describes the numeric quantity value (oz, dashes, etc)
  unit: String
}

extend type Query {
  # Returns a list of all drinks
  listDrinks: [Drink]
}`;
