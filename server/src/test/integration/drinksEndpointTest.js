const app = require('../../server');
const request = require('supertest');
const expect = require('chai').expect;
const dbAdapter = require('../../db/adapter');
const axios = require('axios');
const testObjects = require('../../utils/testObjects');
const strings = require('../../utils/stringConstants');

describe(`'drinks' route - api test`, function() {
  let token;

  before(async function() {
    // increase hook timeout, tests require extensive environment setup
    this.timeout(9000);

    // prime the database with test tables/data
    const tables = await dbAdapter.r.tableList();

    if (tables.includes('drinks')) {
      await dbAdapter.r.tableDrop('drinks');
    }
    await dbAdapter.r.tableCreate('drinks', { primaryKey: 'name' });
    await dbAdapter.r.table('drinks').insert(testObjects.drinkTest);

    const response = await axios(testObjects.tokenRequestOptions);
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
        expect(res.body).to.equal(strings.errors.UNAUTHORIZED);
        done();
      });
  });

  it('GET - handle error if db table is not available', async function() {
    await dbAdapter.r.tableDrop('drinks');
    const res = await request(app)
      .get('/api/v1/drinks')
      .set('Authorization', 'Bearer ' + token);

    expect(res.statusCode).to.equal(500);
    expect(res.body.split(':')[0]).to.equal('ReqlOpFailedError');
  });
});
