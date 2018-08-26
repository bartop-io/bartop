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
    const badId = 'bestfriend<insertname>';
    const query = `
      mutation {
        addDrinksToCatalog(
          input: { userId: "${userId}", drinkIds: ["${badId}"] }
        ) {
          drinks {
            name
          }
          errors {
            message
            id
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
        expect(payload.errors[0].message).to.equal('Drinks Not Found');
        expect(payload.errors[0].id[0]).to.equal(badId);
        done();
      });
  });

  it('Mutation - error on adding a drink for user that doesnt exist', function(done) {
    const badId = 'bernieEddy';
    const query = `
      mutation {
        addDrinksToCatalog(
          input: { userId: "${badId}", drinkIds: ["${oldFashionedId}"] }
        ) {
          drinks {
            name
          }
          errors {
            message
            id
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
        expect(payload.errors).to.be.an('array');
        expect(payload.errors[0].message).to.equal('Resource not found.');
        expect(payload.errors[0].id[0]).to.equal(badId);
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
            id
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
        expect(payload.errors[0].message).to.equal('Drinks Not Found');
        expect(payload.errors[0].id).to.deep.equal([
          'proxieseverywhere',
          'run'
        ]);
        done();
      });
  });
});
