const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../src/server');
const r = require('../../src/db');
const { users, drinks } = require('../utils/testObjects');

describe('Resource - Catalog', function() {
  const TOKEN = global.testToken;
  let userId;
  let oldFashionedId;

  before(async function() {
    // increase hook timeout, tests require extensive environment setup
    this.timeout(9000);

    // prime the database with test tables/data
    const tables = await r.tableList();
    if (tables.includes('users')) {
      await r.tableDrop('users');
    }
    await r.tableCreate('users');

    if (tables.includes('drinks')) {
      await r.tableDrop('drinks');
    }
    await r.tableCreate('drinks');

    const response = await r.table('users').insert(users.testUser);
    userId = response.generated_keys[0];

    const dbResponse = await r.table('drinks').insert(drinks.oldFashioned);
    oldFashionedId = dbResponse.generated_keys[0];
    return;
  });

  it('Mutation - add a single drink to a catalog', function(done) {
    const query = `
      mutation {
        addDrinksToCatalog(
          input: { userId: "${userId}", drinkIds: ["${oldFashionedId}"] }
        ) {
          drinks {
            name
          }
          errors {
            message
          }
        }
      }`;
    request(app)
      .post('/api/graphql')
      .set('Authorization', `Bearer ${TOKEN}`)
      .set('Content-Type', 'application/json')
      .send({ query })
      .end((err, res) => {
        const payload = res.body.data.addDrinksToCatalog;
        expect(res.statusCode).to.equal(200);
        expect(payload).to.be.an('object');
        expect(payload.drinks).to.be.an('array');
        expect(payload.drinks[0].name).to.equal('Old Fashioned');
        expect(payload.errors).to.equal(null);
        done();
      });
  });

  it('Mutation - add a fake drink, should be invalid', function(done) {
    const query = `
      mutation {
        addDrinksToCatalog(
          input: { userId: "${userId}", drinkIds: ["bestfriend<insertname>"] }
        ) {
          drinks {
            name
          }
          errors {
            message
          }
        }
      }`;
    request(app)
      .post('/api/graphql')
      .set('Authorization', `Bearer ${TOKEN}`)
      .set('Content-Type', 'application/json')
      .send({ query })
      .end((err, res) => {
        const payload = res.body.data.addDrinksToCatalog;
        expect(res.statusCode).to.equal(200);
        expect(payload).to.be.an('object');
        expect(payload.drinks).to.equal(null);
        expect(payload.errors).to.be.an('array');
        expect(payload.errors[0].message).to.equal(
          'The following drink ids are invalid: bestfriend<insertname>'
        );
        done();
      });
  });

  it('Mutation - error on adding a drink for user that doesnt exist', function(done) {
    const query = `
      mutation {
        addDrinksToCatalog(
          input: { userId: "bernieEddy", drinkIds: ["${oldFashionedId}"] }
        ) {
          drinks {
            name
          }
          errors {
            message
          }
        }
      }`;
    request(app)
      .post('/api/graphql')
      .set('Authorization', `Bearer ${TOKEN}`)
      .set('Content-Type', 'application/json')
      .send({ query })
      .end((err, res) => {
        const payload = res.body.errors;
        expect(res.statusCode).to.equal(500);
        expect(payload).to.be.an('array');
        expect(payload[0].message).to.equal(
          'Resource with ID: bernieEddy does not exist.'
        );
        done();
      });
  });

  it('Mutation - remove a single drink from a catalog', function(done) {
    const query = `
      mutation {
        removeDrinksFromCatalog(
          input: { userId: "${userId}", drinkIds: "${oldFashionedId}" }
        ) {
          drinks {
            name
          }
          errors {
            message
          }
        }
      }`;
    request(app)
      .post('/api/graphql')
      .set('Authorization', `Bearer ${TOKEN}`)
      .set('Content-Type', 'application/json')
      .send({ query })
      .end((err, res) => {
        const payload = res.body.data.removeDrinksFromCatalog;
        expect(res.statusCode).to.equal(200);
        expect(payload).to.be.an('object');
        expect(payload.drinks).to.be.an('array');
        expect(payload.drinks[0].name).to.equal('Old Fashioned');
        expect(payload.errors).to.equal(null);
        done();
      });
  });

  it('Mutation - remove a fake drink, should be invalid', function(done) {
    const query = `
      mutation {
        removeDrinksFromCatalog(
          input: { userId: "${userId}", drinkIds: ["proxieseverywhere", "run"] }
        ) {
          drinks {
            name
          }
          errors {
            message
          }
        }
      }`;
    request(app)
      .post('/api/graphql')
      .set('Authorization', `Bearer ${TOKEN}`)
      .set('Content-Type', 'application/json')
      .send({ query })
      .end((err, res) => {
        const payload = res.body.data.removeDrinksFromCatalog;
        expect(res.statusCode).to.equal(200);
        expect(payload).to.be.an('object');
        expect(payload.drinks).to.equal(null);
        expect(payload.errors).to.be.an('array');
        expect(payload.errors[0].message).to.equal(
          'The following drink ids are invalid: proxieseverywhere, run'
        );
        done();
      });
  });
});
