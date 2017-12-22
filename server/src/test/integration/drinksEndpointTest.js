const app = require('../../server');
const request = require('supertest');
const expect = require('chai').expect;
const dbAdapter = require('../../db/adapter');
const token = require('../../../config').auth.test;

describe(`'drinks' route - api test`, function() {
  // before the tests, prime the database with test tables/data
  before(async function() {
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
    return Promise.resolve();
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
    try {
      await dbAdapter.r.tableDrop('drinks');
    } finally {
      request(app)
        .get('/api/v1/drinks')
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
          expect(res.body).to.equal('Something broke!');
        });
    }
  });
});
