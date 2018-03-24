const app = require('../../src/server');
const request = require('supertest');
const expect = require('chai').expect;
const dbAdapter = require('../../src/db/adapter');
const { drinks } = require('../utils/testObjects');

describe('Resource - Drink', function() {
  const token = global.testToken;

  before(async function() {
    // prime the database with test tables/data
    const tables = await dbAdapter.r.tableList();

    if (tables.includes('drinks')) {
      await dbAdapter.r.tableDrop('drinks');
    }
    await dbAdapter.r.tableCreate('drinks');
    await dbAdapter.r.table('drinks').insert(drinks.list);
    return;
  });

  after(async function() {
    // drop the drinks table once we're finished with it
    // for the 'Resource - Errors' test
    const tables = await dbAdapter.r.tableList();

    if (tables.includes('drinks')) {
      await dbAdapter.r.tableDrop('drinks');
    }
    return;
  });

  describe('Rest', function() {
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
  });

  describe('GraphQL', function() {
    it('Query - return names for all drinks', function(done) {
      request(app)
        .get('/api/v2/graphql?query={listDrinks{name}}')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          const drinks = res.body.data.listDrinks;
          expect(res.statusCode).to.equal(200);
          expect(drinks).to.be.an('array');
          // expect only names to have been returned
          expect(Object.keys(drinks[0]).length).to.equal(1);
          expect(Object.keys(drinks[0])[0]).to.equal('name');
          done();
        });
    });
  });
});
