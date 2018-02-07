const app = require('../../server');
const request = require('supertest');
const expect = require('chai').expect;
const axios = require('axios');
const testObjects = require('../../utils/testObjects');
const strings = require('../../utils/stringConstants');

// this test suite is for routes unhandled by the API routers
describe(`'bad' routes - api test`, function() {
  let token;

  before(async function() {
    this.timeout(9000);
    const response = await axios(testObjects.tokenRequestOptions);
    token = response.data.access_token;
    return;
  });

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
