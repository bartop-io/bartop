const app = require('../../src/server');
const request = require('supertest');
const expect = require('chai').expect;
const dbAdapter = require('../../src/db/adapter');
const strings = require('../../src/utils/stringConstants');

describe(`'users' route - api test`, function() {
  const token = global.testToken;

  before(async function() {
    // increase hook timeout, tests require extensive environment setup
    this.timeout(9000);

    // prime the database with test tables/data
    const tables = await dbAdapter.r.tableList();
    if (tables.includes('users')) {
      await dbAdapter.r.tableDrop('users');
    }
    await dbAdapter.r.tableCreate('users');
    return;
  });

  it(`POST - create a new user`, function(done) {
    request(app)
      .post(`/api/v1/users/${strings.test.ID}`)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.deep.equal({ id: strings.test.ID });
        done();
      });
  });

  it('POST - return a 401 if a user is unauthorized', function(done) {
    request(app)
      .post(`/api/v1/users/${strings.test.ID}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.equal(strings.errors.UNAUTHORIZED);
        done();
      });
  });

  it('POST - handle error if db table is not available', async function() {
    await dbAdapter.r.tableDrop('users');
    const res = await request(app)
      .post(`/api/v1/users/${strings.test.ID}`)
      .set('Authorization', 'Bearer ' + token);

    expect(res.statusCode).to.equal(500);
    expect(res.body.split(':')[0]).to.equal('ReqlOpFailedError');
  });
});
