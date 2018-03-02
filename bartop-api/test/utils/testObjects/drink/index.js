const oldFashioned = {
  name: 'Old Fashioned',
  description: 'This drink was invented in 1806.',
  instructions: [
    'Put all ingredients into mixing glass',
    'Stir with ice for 18 seconds',
    'Strain over fresh ice into chilled Old Fashioned glass',
    'Express orange peel and drop into the glass'
  ],
  ingredients: [
    {
      ingredient: 'Whiskey',
      amount: {
        quantity: 2,
        unit: 'oz'
      }
    },
    {
      ingredient: 'Simple syrup',
      amount: {
        quantity: 1,
        unit: 'barspoon'
      }
    },
    {
      ingredient: 'Angostura bitters',
      amount: {
        quantity: 3,
        unit: 'dashes'
      }
    },
    {
      ingredient: 'Orange peel',
      amount: {
        quantity: 1,
        unit: 'for garnish'
      }
    }
  ]
};

const tommyC = {
  name: 'Tom Collins',
  description: 'This cocktail gets its name from the use of Old Tom Gin.',
  instructions: [
    'Put all ingredients into shaker tin',
    'Pour club soda into chilled Collins glass filled with fresh ice',
    'Shake other ingredients with ice for 10 seconds',
    'Strain into the Collins glass',
    'Express lemon peel and drop into the glass'
  ],
  ingredients: [
    {
      ingredient: 'Gin',
      amount: {
        quantity: 2,
        unit: 'oz'
      }
    },
    {
      ingredient: 'Lemon juice',
      amount: {
        quantity: 0.75,
        unit: 'oz'
      }
    },
    {
      ingredient: 'Simple syrup',
      amount: {
        quantity: 0.75,
        unit: 'oz'
      }
    },
    {
      ingredient: 'Club soda',
      amount: {
        quantity: 2,
        unit: 'oz'
      }
    },
    {
      ingredient: 'Lemon peel',
      amount: {
        quantity: 1,
        unit: 'for garnish'
      }
    }
  ]
};

module.exports.oldFashioned = oldFashioned;
module.exports.tomCollins = tommyC;
module.exports.drinkList = [oldFashioned, tommyC];
