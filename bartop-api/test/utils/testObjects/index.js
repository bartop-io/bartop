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

// create a list of tables that can be assumed to exist at any given time
const tables = ['drinks', 'catalogs', 'menus', 'orders', 'sessions', 'users'];

module.exports.res = new Response();
module.exports.dbTables = tables;
module.exports.drinks = drinkTestObjects;
module.exports.users = userTestObjects;
