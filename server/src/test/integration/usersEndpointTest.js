const app = require('../../server');
const request = require('supertest');
const expect = require('chai').expect;
const dbAdapter = require('../../db/adapter');
const axios = require('axios');
const options = require('../../utils/testObjects').tokenRequestOptions;
const constants = require('../../utils/stringConstants');

describe(`'users' route - api test`, function() {
  let token;

  before(async function() {
    // prime the database with test tables/data
    const tables = await dbAdapter.r.tableList();
    if (tables.includes('users')) {
      await dbAdapter.r.tableDrop('users');
    }
    await dbAdapter.r.tableCreate('users');

    // get a temporary bearer token for testing
    const response = await axios(options);
    token = response.data.access_token;

    return;
  });

  // after the tests, drain the connection pool so the process exits properly
  // this has to happen after the last tests are run
  after(async function() {
    await dbAdapter.r.getPoolMaster().drain();
    return;
  });

  it(`POST - create a new user`, function(done) {
    request(app)
      .post('/api/v1/users/12345')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.deep.equal({ id: '12345' });
        done();
      });
  });

  it('POST - return a 401 if a user is unauthorized', function(done) {
    request(app)
      .post('/api/v1/users/12345')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.equal(constants.errors.UNAUTHORIZED);
        done();
      });
  });

  it('POST - handle error if db table is not available', async function() {
    await dbAdapter.r.tableDrop('users');
    const res = await request(app)
      .post('/api/v1/users/0987')
      .set('Authorization', 'Bearer ' + token);

    expect(res.statusCode).to.equal(500);
    expect(res.body.split(':')[0]).to.equal('ReqlOpFailedError');
  });
});
