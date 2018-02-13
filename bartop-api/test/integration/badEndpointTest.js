const app = require('../../src/server');
const request = require('supertest');
const expect = require('chai').expect;
const strings = require('../../src/utils/stringConstants');

// this test suite is for routes unhandled by the API routers
describe(`'bad' routes - api test`, function() {
  const token = global.testToken;

  it('GET - return a 404 if top level route does not exist', function(done) {
    request(app)
      .get('/hamburgular')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.equal(strings.errors.NONEXISTENT);
        done();
      });
  });

  it('GET - return a 404 if api route does not exist', function(done) {
    request(app)
      .post('/api/v1/hamburgular')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.equal(strings.errors.NONEXISTENT);
        done();
      });
  });
});
