const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../src/server');
const r = require('../../src/db');
const { users } = require('../utils/testObjects');
const errors = require('../../src/utils/errorConstants');

describe('Resource - Catalog', function() {
  const TOKEN = global.testToken;
  let userId;

  before(async function() {
    // increase hook timeout, tests require extensive environment setup
    this.timeout(9000);

    // prime the database with test tables/data
    const tables = await r.tableList();
    if (tables.includes('users')) {
      await r.tableDrop('users');
    }
    await r.tableCreate('users');
    const response = await r.table('users').insert(users.testUser);
    userId = response.generated_keys[0];
    return;
  });

  describe('Rest', function() {
    const drinkIds = ['drink1', 'drink2'];

    it('PUT - replace a catalog for a user', function(done) {
      request(app)
        .put('/api/v1/catalogs')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({ userId, drinkIds })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.catalog).to.deep.equal(drinkIds);
          done();
        });
    });

    it('PUT - send metadata for unchanged catalog', function(done) {
      request(app)
        .put('/api/v1/catalogs')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({ userId, drinkIds })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.catalog).to.deep.equal(drinkIds);
          expect(res.body.unchanged).to.equal(true);
          done();
        });
    });

    it('PUT - throw error if user does not exist', function(done) {
      const thisError = errors.NOT_FOUND;
      request(app)
        .put('/api/v1/catalogs')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({ userId: 'Arnald', drinkIds })
        .end((err, res) => {
          expect(res.statusCode).to.equal(thisError.code);
          expect(res.body).to.equal(thisError.message);
          done();
        });
    });

    it('PUT - throw error if body does not match model', function(done) {
      const thisError = errors.BODY_MODEL;
      request(app)
        .put('/api/v1/catalogs')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({ id: users.postUser.auth0Id })
        .end((err, res) => {
          expect(res.statusCode).to.equal(thisError.code);
          expect(res.body).to.equal(thisError.message);
          done();
        });
    });

    it('PUT - throw error if content-type is unsupported', function(done) {
      const thisError = errors.CONTENT_TYPE;
      request(app)
        .put('/api/v1/catalogs')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${TOKEN}`)
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
    const drinkIds = ['drink3', 'drink4'];

    it('Mutation - replace empty catalog for a user', function(done) {
      const query = `
        mutation {
          replaceCatalog(input: { userId: "${userId}", drinkIds: ["${drinkIds.join(
        '", "'
      )}"] }) {
            catalog
            unchanged
          }
        }`;
      request(app)
        .post('/api/graphql')
        .set('Authorization', `Bearer ${TOKEN}`)
        .set('Content-Type', 'application/json')
        .send({ query })
        .end((err, res) => {
          // replaceCatalog returns the updated catalog array
          const payload = res.body.data.replaceCatalog;
          expect(res.statusCode).to.equal(200);
          expect(payload).to.be.an('object');
          expect(payload.catalog).to.deep.equal(drinkIds);
          expect(payload.unchanged).to.equal(null);
          done();
        });
    });

    it('Mutation - return unchanged when replacing catalog with identical catalog', function(done) {
      const query = `
        mutation {
          replaceCatalog(input: { userId: "${userId}", drinkIds: ["${drinkIds.join(
        '", "'
      )}"] }) {
            catalog
            unchanged
          }
        }`;
      request(app)
        .post('/api/graphql')
        .set('Authorization', `Bearer ${TOKEN}`)
        .set('Content-Type', 'application/json')
        .send({ query })
        .end((err, res) => {
          // replaceCatalog returns the updated catalog array
          const payload = res.body.data.replaceCatalog;
          expect(res.statusCode).to.equal(200);
          expect(payload).to.be.an('object');
          expect(payload.catalog).to.deep.equal(drinkIds);
          expect(payload.unchanged).to.equal(true);
          done();
        });
    });

    it('Mutation - error on replacing a catalog with bad schema', function(done) {
      const query = `
        mutation {
          replaceCatalog(input: {}) {
            catalog
          }
        }`;
      request(app)
        .post('/api/graphql')
        .set('Authorization', `Bearer ${TOKEN}`)
        .set('Content-Type', 'application/json')
        .send({ query })
        .end((err, res) => {
          const errorResponse = res.body.errors;
          expect(res.statusCode).to.equal(400);
          expect(errorResponse.length).to.equal(2);
          expect(errorResponse[0].message).to.equal(
            'Field ReplaceCatalogInput.userId of required type ID! was not provided.'
          );
          expect(errorResponse[1].message).to.equal(
            'Field ReplaceCatalogInput.drinkIds of required type [ID]! was not provided.'
          );
          done();
        });
    });
  });
});
