const app = require('../../server');
const request = require('supertest');
const expect = require('chai').expect;
const dbAdapter = require('../../db/adapter');

describe(`'users' route - api test`, function() {
  // before the tests, prime the database with test tables/data
  before(async function() {
    const tables = await dbAdapter.r.tableList();

    if (tables.includes('users')) {
      await dbAdapter.r.tableDrop('users');
    }

    await dbAdapter.r.tableCreate('users');
    return Promise.resolve();
  });

  // after the tests, drain the connection pool so the process exits properly
  // this has to happen after the last tests are run
  after(async function() {
    await dbAdapter.r.getPoolMaster().drain();
    return Promise.resolve();
  });

  it(`POST - create a new user`, function(done) {
    request(app)
      .post('/api/v1/users/12345')
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.deep.equal({ id: '12345' });
        done();
      });
  });

  it('POST - handle error if db table is not available', async function() {
    try {
      await dbAdapter.r.tableDrop('users');
    } finally {
      request(app)
        .post('/api/v1/users/0987')
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
          expect(res.body).to.equal('Something broke!');
        });
    }
  });
});
