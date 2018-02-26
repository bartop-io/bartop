// ***
// type Query may need to be 'extend'ed to allow for multiple files used
// need to implement Users first

module.exports = `
type Query {
  drinks: [Drink]
}

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
}`;
