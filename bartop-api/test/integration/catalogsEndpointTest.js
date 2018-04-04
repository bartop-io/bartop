const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../src/server');
const dbAdapter = require('../../src/db/adapter');
const { users } = require('../utils/testObjects');
const errors = require('../../src/utils/errorConstants');

describe('Resource - Catalog', function() {
  const token = global.testToken;
  let userId;
  const drinkIds = ['drink1', 'drink2'];

  before(async function() {
    // increase hook timeout, tests require extensive environment setup
    this.timeout(9000);

    // prime the database with test tables/data
    const tables = await dbAdapter.r.tableList();
    if (tables.includes('users')) {
      await dbAdapter.r.tableDrop('users');
    }
    await dbAdapter.r.tableCreate('users');
    const response = await dbAdapter.r.table('users').insert(users.testUser);
    userId = response.generated_keys[0];
    return;
  });

  describe('Rest', function() {
    it('POST - create a new catalog for a user', function(done) {
      request(app)
        .post('/api/v1/catalogs')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ userId, drinkIds })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal(userId);
          expect(res.body.auth0Id).to.equal(users.testUser.auth0Id);
          expect(res.body.catalog).to.deep.equal(drinkIds);
          done();
        });
    });

    it('POST - throw error if user does not exist', function(done) {
      const thisError = errors.NOT_FOUND;
      request(app)
        .post('/api/v1/catalogs')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ userId: 'Arnald', drinkIds })
        .end((err, res) => {
          expect(res.statusCode).to.equal(thisError.code);
          expect(res.body).to.equal(thisError.message);
          done();
        });
    });

    it('POST - throw error if body does not match model', function(done) {
      const thisError = errors.BODY_MODEL;
      request(app)
        .post('/api/v1/catalogs')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: users.postUser.auth0Id })
        .end((err, res) => {
          expect(res.statusCode).to.equal(thisError.code);
          expect(res.body).to.equal(thisError.message);
          done();
        });
    });

    it('POST - throw error if content-type is unsupported', function(done) {
      const thisError = errors.CONTENT_TYPE;
      request(app)
        .post('/api/v1/catalogs')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${token}`)
        // if content-type is not set to json,
        // the send() method expects a string
        .send(`{ id: ${users.postUser.auth0Id} }`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(thisError.code);
          expect(res.body).to.equal(thisError.message);
          done();
        });
    });
  });

  describe('GraphQL', function() {
    it('Mutation - create a new catalog for a user', function(done) {
      const query = `
        mutation {
          createCatalog(newCatalog: { userId: "${userId}", drinkIds: ["${drinkIds.join(
        '", "'
      )}"] }) {
            id
            auth0Id
            catalog
          }
        }`;
      request(app)
        .post('/api/graphql')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .send({ query })
        .end((err, res) => {
          // createCatalog returns the updated user object
          const user = res.body.data.createCatalog;
          expect(res.statusCode).to.equal(200);
          expect(user).to.be.an('object');
          expect(user.id).to.be.a('string');
          expect(user.auth0Id).to.equal(users.testUser.auth0Id);
          expect(user.catalog).to.deep.equal(drinkIds);
          done();
        });
    });

    it('Mutation - error on creating user with bad schema', function(done) {
      const query = `
        mutation {
          createCatalog(newCatalog: {}) {
            id
          }
        }`;
      request(app)
        .post('/api/graphql')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .send({ query })
        .end((err, res) => {
          const errorResponse = res.body.errors;
          expect(res.statusCode).to.equal(400);
          expect(errorResponse.length).to.equal(2);
          expect(errorResponse[0].message).to.equal(
            'Field CatalogInput.userId of required type ID! was not provided.'
          );
          expect(errorResponse[1].message).to.equal(
            'Field CatalogInput.drinkIds of required type [ID]! was not provided.'
          );
          done();
        });
    });
  });
});
