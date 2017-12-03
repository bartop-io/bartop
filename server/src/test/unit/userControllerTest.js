const expect = require('chai').expect;
const controllerModule = require('../../api/user/userController');
const sinon = require('sinon');

describe('users controller - unit test', function(done) {
  it('.create - set correct status code and user object', async function() {
    const mockDb = {};

    mockDb.create = async (tableName, newUser) => {
      return Promise.resolve(newUser);
    };

    const req = {
      params: {
        id: 1234567
      }
    };

    // use standard functions to access 'this' for implementing chained
    // methods to simulate express, i.e. res.status(201).json(user)
    const res = function() {
      this.statusCode = 200;
    };

    res.status = function(code) {
      this.statusCode = code;
      return this;
    };

    res.json = data => data;

    const jsonSpy = sinon.spy(res, 'json');
    const statusSpy = sinon.spy(res, 'status');

    const controller = controllerModule(mockDb).create;
    await controller(req, res, null);

    expect(jsonSpy.calledOnce).to.equal(true);
    expect(jsonSpy.alwaysCalledWithExactly({ id: 1234567 })).to.equal(true);

    expect(statusSpy.calledOnce).to.equal(true);
    expect(statusSpy.alwaysCalledWithExactly(201)).to.equal(true);

    jsonSpy.restore();
    statusSpy.restore();
  });
});
