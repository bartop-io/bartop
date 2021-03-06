const app = require('../../src/server');
const request = require('supertest');
const expect = require('chai').expect;
const r = require('../../src/db');
const { drinks } = require('../utils/testObjects');

describe('Resource - Drink', function() {
  const TOKEN = global.testToken;

  before(async function() {
    // increase hook timeout, tests require extensive environment setup
    this.timeout(9000);

    // prime the database with test tables/data
    const tables = await r.tableList();

    if (tables.includes('drinks')) {
      await r.tableDrop('drinks');
    }
    await r.tableCreate('drinks');
    await r.table('drinks').insert(drinks.list);
    return;
  });

  after(async function() {
    // drop the drinks table once we're finished with it
    // for the 'Resource - Errors' test
    const tables = await r.tableList();

    if (tables.includes('drinks')) {
      await r.tableDrop('drinks');
    }
    return;
  });

  describe('Rest', function() {
    it(`GET - return array of drinks`, function(done) {
      request(app)
        .get('/api/v1/drinks')
        .set('Authorization', `Bearer ${TOKEN}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.items).to.be.an('array');

          const firstDrinkObject = res.body.items[0];
          expect(firstDrinkObject.id).to.be.a('string');
          expect(firstDrinkObject.name).to.be.a('string');
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
        .get('/api/graphql?query={listDrinks{name}}')
        .set('Authorization', `Bearer ${TOKEN}`)
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
