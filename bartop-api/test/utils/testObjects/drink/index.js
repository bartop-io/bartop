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

const daiquiri = {
  name: 'Daiquiri',
  description: 'Classic Cuban cocktail.',
  instructions: [
    'Put all ingredients into shaker tin',
    'Shake ingredients with ice for 10 seconds',
    'Fine strain into chilled coupe glass'
  ],
  ingredients: [
    {
      ingredient: 'White rum',
      amount: {
        quantity: 2,
        unit: 'oz'
      }
    },
    {
      ingredient: 'Lime juice',
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
    }
  ]
};

const whiskeySour = {
  name: 'Whiskey Sour',
  description:
    'Classic pre-Prohibition cocktail that gets a bad rep but when made well is excellent.',
  instructions: [
    'Put all ingredients into shaker tin without ice',
    'Shake hard for 2 seconds',
    'Add ice and shake all ingredients for 10 seconds',
    'Fine strain into chilled glass, either neat or over fresh ice.'
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
      ingredient: 'Egg white',
      amount: {
        quantity: 1
      }
    },
    {
      ingredient: 'Angostura bitters (Optional)',
      amount: {
        quantity: 1,
        unit: 'dash'
      }
    },
    {
      ingredient: 'Lemon peel (Optional)',
      amount: {
        quantity: 1,
        unit: 'for garnish'
      }
    }
  ]
};

const marg = {
  name: 'Margarita',
  description: 'The name means "Daisy" in Spanish.',
  instructions: [
    'Put all ingredients into shaker tin',
    'Shake ingredients with ice for 10 seconds',
    'Strain into glass over fresh ice or serve neat'
  ],
  ingredients: [
    {
      ingredient: 'Tequila',
      amount: {
        quantity: 2,
        unit: 'oz'
      }
    },
    {
      ingredient: 'Cointreau',
      amount: {
        quantity: 1,
        unit: 'oz'
      }
    },
    {
      ingredient: 'Lime juice',
      amount: {
        quantity: 0.5,
        unit: 'oz'
      }
    },
    {
      ingredient: 'Simple syrup',
      amount: {
        quantity: 0.5,
        unit: 'oz'
      }
    },
    {
      ingredient: 'Salt rim',
      amount: {
        quantity: 1,
        unit: 'for garnish'
      }
    },
    {
      ingredient: 'Lime wheel (Optional)',
      amount: {
        quantity: 1,
        unit: 'for garnish'
      }
    }
  ]
};

module.exports.oldFashioned = oldFashioned;
module.exports.tomCollins = tommyC;
module.exports.list = [oldFashioned, tommyC];
module.exports.populate = [oldFashioned, tommyC, daiquiri, whiskeySour, marg];
