const app = require('../../server');
const request = require('supertest');
const expect = require('chai').expect;
const dbAdapter = require('../../db/adapter');

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

  // after the tests, drain the connection pool so the process exits properly
  after(async function() {
    await dbAdapter.r.getPoolMaster().drain();
    return Promise.resolve();
  });

  // test a successful hit to get all drinks
  it(`GET - return array of drinks`, function(done) {
    request(app)
      .get('/api/v1/drinks')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].name).to.equal('Tom Collins');
        expect(res.body[1].name).to.equal('Old Fashioned');
        done();
      });
  });

  // test the get route for handling an error
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
