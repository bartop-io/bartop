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

module.exports.res = new Response();
module.exports.req = request;
module.exports.drinks = drinkTestObjects;
module.exports.users = userTestObjects;
