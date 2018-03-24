const drinkTestObjects = require('./drink');
const userTestObjects = require('./user');

// some shared request headers
const commonHeaders = {
  'Content-Type': 'application/json'
};

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

const request = {
  header: key => {
    return commonHeaders[key];
  }
};

// create a list of tables that can be assumed to exist at any given time
const tables = ['drinks', 'catalogs', 'menus', 'orders', 'sessions', 'users'];

module.exports.res = new Response();
module.exports.req = request;
module.exports.dbTables = tables;
module.exports.drinks = drinkTestObjects;
module.exports.users = userTestObjects;
