const app = require('../../server');
const request = require('supertest');
const expect = require('chai').expect;
const dbAdapter = require('../../db/adapter');
const auth = require('../../../config').auth;
const axios = require('axios');

describe(`'drinks' route - api test`, function() {
  let token;

  before(async function() {
    // prime the database with test tables/data
    const tables = await dbAdapter.r.tableList();
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
    if (tables.includes('drinks')) {
      await dbAdapter.r.tableDrop('drinks');
    }
    await dbAdapter.r.tableCreate('drinks', { primaryKey: 'name' });
    await dbAdapter.r.table('drinks').insert(drinkTestObjects);

    // get a temporary bearer token for testing
    const options = {
      method: 'POST',
      url: 'https://bartop.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      data: `{"client_id":"${auth.id}","client_secret":"${auth.secret}","audience":"${auth.audience}","grant_type":"${auth.grant}"}`
    };

    const response = await axios(options);
    token = response.data.access_token;

    return;
  });

  it(`GET - return array of drinks`, function(done) {
    request(app)
      .get('/api/v1/drinks')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].name).to.equal('Tom Collins');
        expect(res.body[1].name).to.equal('Old Fashioned');
        done();
      });
  });

  it('GET - return a 401 if a user is unauthorized', function(done) {
    request(app)
      .get('/api/v1/drinks')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.equal('Access... DENIED.');
        done();
      });
  });

  it('GET - handle error if db table is not available', async function() {
    await dbAdapter.r.tableDrop('drinks');
    const res = await request(app)
      .get('/api/v1/drinks')
      .set('Authorization', 'Bearer ' + token);

    expect(res.statusCode).to.equal(500);
    expect(res.body).to.equal('Something broke!');
  });
});
