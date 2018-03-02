const app = require('../../src/server');
const request = require('supertest');
const expect = require('chai').expect;
const errors = require('../../src/utils/errorMessages');

// this test suite is for routes unhandled by the API routers
describe(`Resource - Errors`, function() {
  const token = global.testToken;

  it('Nonexistent - if top level route does not exist', function(done) {
    request(app)
      .get('/hamburgular')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.equal(errors.NONEXISTENT);
        done();
      });
  });

  it('Nonexistent - if /api/v1 route does not exist', function(done) {
    request(app)
      .post('/api/v1/hamburgular')
      .set('Authorization', 'Bearer ' + token)
      .send({ fakeKey: 'with fake data' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.equal(errors.NONEXISTENT);
        done();
      });
  });

  it('Unauthorized - if a user does not pass a token', function(done) {
    request(app)
      .get('/api/v1/drinks')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.equal(errors.UNAUTHORIZED);
        done();
      });
  });

  it('Unauthorized - if a user passes an invalid token', function(done) {
    request(app)
      .get('/api/v1/users')
      .set('Authorization', 'Bearer BADTOKEN1234')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.equal(errors.UNAUTHORIZED);
        done();
      });
  });

  // this will test the default case in the error handler
  it('Generic - if db table has mysteriously disappeared', function(done) {
    request(app)
      .get('/api/v1/drinks')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body.split(':')[0]).to.equal('ReqlOpFailedError');
        done();
      });
  });
});
