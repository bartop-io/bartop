const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../src/server');
const errors = require('../../src/utils/errorConstants');

// this test suite is for general errors, not tied to specific route
describe(`Resource - Errors`, function() {
  const TOKEN = global.testToken;

  it('Nonexistent - if top level route does not exist', function(done) {
    const thisError = errors.NONEXISTENT;
    request(app)
      .get('/hamburgular')
      .set('Authorization', `Bearer ${TOKEN}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(thisError.code);
        expect(res.body).to.equal(thisError.message);
        done();
      });
  });

  it('Nonexistent - if /api/v1 route does not exist', function(done) {
    const thisError = errors.NONEXISTENT;
    request(app)
      .post('/api/v1/hamburgular')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ fakeKey: 'with fake data' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(thisError.code);
        expect(res.body).to.equal(thisError.message);
        done();
      });
  });

  it('Unauthorized - if a user does not pass a TOKEN', function(done) {
    const thisError = errors.UNAUTHORIZED;
    request(app)
      .get('/api/v1/drinks')
      .end((err, res) => {
        expect(res.statusCode).to.equal(thisError.code);
        expect(res.body).to.equal(thisError.message);
        done();
      });
  });

  it('Unauthorized - if a user passes an invalid TOKEN', function(done) {
    const thisError = errors.UNAUTHORIZED;
    request(app)
      .get('/api/v1/users')
      .set('Authorization', 'Bearer BADTOKEN1234')
      .end((err, res) => {
        expect(res.statusCode).to.equal(thisError.code);
        expect(res.body).to.equal(thisError.message);
        done();
      });
  });

  // any route that validates for content-type will require that it must be set
  // as a header, so this is a general and route agnostic test
  it('Content-Type - if no Content-Type is specified on POST', function(done) {
    const thisError = errors.CONTENT_TYPE;
    request(app)
      .post('/api/v1/users')
      .set('Authorization', `Bearer ${TOKEN}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(thisError.code);
        expect(res.body).to.equal(thisError.message);
        done();
      });
  });

  // this will test the default case in the error handler
  it('Generic - if db table has mysteriously disappeared', function(done) {
    request(app)
      .get('/api/v1/drinks')
      .set('Authorization', `Bearer ${TOKEN}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body.split(':')[0]).to.equal('ReqlOpFailedError');
        done();
      });
  });
});
