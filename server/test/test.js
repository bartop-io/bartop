const app = require('../server');
const request = require('supertest');
const expect = require('chai').expect;

describe('Fake Test!', function(done) {

	it('should return a silly welcome message', function(done) {
		request(app)
			.get('/api/v1/hello')
			.end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('string');
				done();
			})
	});
});