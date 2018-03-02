module.exports = `
# primary type
type Drink {
  id: String
  name: String
  description: String
  instructions: [String]
  ingredients: [Ingredient]
}

# sub-types for drink type
type Ingredient {
  ingredient: String
  amount: Amount
}

type Amount {
  quantity: Int
  unit: String
}

extend type Query {
  listDrinks: [Drink]
}`;
