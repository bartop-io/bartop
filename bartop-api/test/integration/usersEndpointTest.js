const app = require('../../src/server');
const request = require('supertest');
const expect = require('chai').expect;
const dbAdapter = require('../../src/db/adapter');
const { users } = require('../utils/testObjects');

describe('Resource - User', function() {
  const token = global.testToken;

  before(async function() {
    // prime the database with test tables/data
    const tables = await dbAdapter.r.tableList();
    if (tables.includes('users')) {
      await dbAdapter.r.tableDrop('users');
    }
    await dbAdapter.r.tableCreate('users');
    await dbAdapter.r.table('users').insert(users.userList);
    return;
  });

  describe('Rest', function() {
    it('POST - create a new user', function(done) {
      request(app)
        .post(`/api/v1/users/${users.postUser.id}`)
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.deep.equal({ id: users.postUser.id });
          done();
        });
    });
  });

  describe('GraphQL', function() {
    it('Query - list ids for all users', function(done) {
      request(app)
        .get('/api/v2/graphql?query={listUsers{id}}')
        .set('Authorization', 'Bearer ' + token)
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
          createUser(newUser: { id: "${users.testUser.id}" }) {
            id
          }
        }`;
      request(app)
        .post('/api/v2/graphql')
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json')
        .send({ query })
        .end((err, res) => {
          const user = res.body.data.createUser;
          expect(res.statusCode).to.equal(200);
          expect(user).to.be.an('object');
          expect(user.id).to.equal(users.testUser.id);
          done();
        });
    });
  });
});
