const drinkTestObjects = require('./drink');
const userTestObjects = require('./user');

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
module.exports.drinks = drinkTestObjects;
module.exports.users = userTestObjects;
