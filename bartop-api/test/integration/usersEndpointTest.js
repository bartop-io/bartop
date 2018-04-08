const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../src/server');
const r = require('../../src/db');
const { users } = require('../utils/testObjects');
const { BODY_MODEL, CONTENT_TYPE } = require('../../src/utils/errorConstants');

describe('Resource - User', function() {
  const TOKEN = global.testToken;

  before(async function() {
    // increase hook timeout, tests require extensive environment setup
    this.timeout(9000);

    // prime the database with test tables/data
    const tables = await r.tableList();
    if (tables.includes('users')) {
      await r.tableDrop('users');
    }
    await r.tableCreate('users');
    await r.table('users').insert(users.list);
    return;
  });

  describe('Rest', function() {
    it('POST - create a new user', function(done) {
      request(app)
        .post('/api/v1/users')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({ auth0Id: users.postUser.auth0Id })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.not.equal(users.postUser.auth0Id);
          expect(res.body.auth0Id).to.equal(users.postUser.auth0Id);
          done();
        });
    });

    it('POST - throw error if body does not match model', function(done) {
      request(app)
        .post('/api/v1/users')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send({ id: users.postUser.auth0Id })
        .end((err, res) => {
          expect(res.statusCode).to.equal(BODY_MODEL.code);
          expect(res.body).to.equal(BODY_MODEL.message);
          done();
        });
    });

    it('POST - throw error if content-type is unsupported', function(done) {
      request(app)
        .post('/api/v1/users')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${TOKEN}`)
        // if content-type is not set to json,
        // the send() method expects a string
        .send(`{ id: ${users.postUser.auth0Id} }`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(CONTENT_TYPE.code);
          expect(res.body).to.equal(CONTENT_TYPE.message);
          done();
        });
    });

    it(`GET - return array of users`, function(done) {
      request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.items).to.be.an('array');

          const firstUserObject = res.body.items[0];
          expect(firstUserObject.id).to.be.a('string');
          expect(firstUserObject.auth0Id).to.be.a('string');

          done();
        });
    });
  });

  describe('GraphQL', function() {
    it('Query - list ids for all users', function(done) {
      request(app)
        .get('/api/graphql?query={listUsers{id}}')
        .set('Authorization', `Bearer ${TOKEN}`)
        .end((err, res) => {
          const users = res.body.data.listUsers;
          expect(res.statusCode).to.equal(200);
          expect(users).to.be.an('array');
          // expect only ids to have been returned
          expect(Object.keys(users[0]).length).to.equal(1);
          expect(Object.keys(users[0])[0]).to.equal('id');
          done();
        });
    });

    it('Mutation - create a new user', function(done) {
      const query = `
        mutation {
          createUser(newUser: { auth0Id: "${users.testUser.auth0Id}" }) {
            id
            auth0Id
          }
        }`;
      request(app)
        .post('/api/graphql')
        .set('Authorization', `Bearer ${TOKEN}`)
        .set('Content-Type', 'application/json')
        .send({ query })
        .end((err, res) => {
          const user = res.body.data.createUser;
          expect(res.statusCode).to.equal(200);
          expect(user).to.be.an('object');
          expect(user.id).to.not.equal(users.testUser.auth0Id);
          expect(user.auth0Id).to.equal(users.testUser.auth0Id);
          done();
        });
    });

    it('Mutation - error on creating user with bad schema', function(done) {
      const query = `
        mutation {
          createUser(newUser: {}) {
            id
          }
        }`;
      request(app)
        .post('/api/graphql')
        .set('Authorization', `Bearer ${TOKEN}`)
        .set('Content-Type', 'application/json')
        .send({ query })
        .end((err, res) => {
          const error = res.body.errors[0];
          expect(res.statusCode).to.equal(400);
          expect(error.message).to.equal(
            'Field UserInput.auth0Id of required type String! was not provided.'
          );
          done();
        });
    });
  });
});
