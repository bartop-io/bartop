const app = require('../../src/server');
const request = require('supertest');
const expect = require('chai').expect;
const dbAdapter = require('../../src/db/adapter');
const testObjects = require('../utils/testObjects');
const strings = require('../../src/utils/stringConstants');

describe(`'drinks' route - api test`, function() {
  const token = global.testToken;

  before(async function() {
    // prime the database with test tables/data
    const tables = await dbAdapter.r.tableList();

    if (tables.includes('drinks')) {
      await dbAdapter.r.tableDrop('drinks');
    }
    await dbAdapter.r.tableCreate('drinks');
    await dbAdapter.r.table('drinks').insert(testObjects.drinks.array);
    return;
  });

  it(`GET - return array of drinks`, function(done) {
    request(app)
      .get('/api/v1/drinks')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');

        const firstDrinkObject = res.body.items[0];
        expect(firstDrinkObject.id).to.be.an('string');
        expect(firstDrinkObject.name).to.be.an('string');
        expect(firstDrinkObject.instructions).to.be.an('array');
        expect(firstDrinkObject.ingredients).to.be.an('array');
        expect(firstDrinkObject.description).to.be.an('string');

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
