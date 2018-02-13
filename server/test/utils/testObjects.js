// test object to place in the database for testing
// the GET drinks endpoint
const drinkTestObjects = [
  {
    ingredients: ['whiskey', 'sugar', 'bitters'],
    name: 'Old Fashioned'
  },
  {
    ingredients: ['gin', 'sugar', 'lemon juice', 'club soda'],
    name: 'Tom Collins'
  }
];

// mocked response object
const Response = class {
  constructor() {
    this.statusCode = 200;
  }
  status(code) {
    this.statusCode = code;
    return this;
  }
  json(data) {
    return data;
  }
};

module.exports.res = new Response();
module.exports.drinkTest = drinkTestObjects;
