const auth = require('../../config').auth;

// axios request options for hitting the auth0 API
// to get a test access token
const options = {
  method: 'POST',
  url: 'https://bartop.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  data: `{"client_id":"${auth.id}",
          "client_secret":"${auth.secret}",
          "audience":"${auth.audience}",
          "grant_type":"${auth.grant}"}`
};

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
module.exports.tokenRequestOptions = options;
module.exports.drinkTest = drinkTestObjects;
