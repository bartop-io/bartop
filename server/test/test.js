const app = require('../server');
const request = require('supertest');
const expect = require('chai').expect;

describe('Fake Test!', function(done) {

	it('should return a silly welcome message', function(done) {
		request(app)
			.get('/api/v1/hello')
			.expect(200)
			.end(function(err, res) {
				done();
			})
	});
});