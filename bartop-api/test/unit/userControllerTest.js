const expect = require('chai').expect;
const controllerModule = require('../../src/api/user/userController');
const sinon = require('sinon');
const res = require('../utils/testObjects').res;
const strings = require('../../src/utils/stringConstants').test;

describe('users controller - unit test', function(done) {
  it('.create - set correct status code and user object', async function() {
    const mockDb = {};

    mockDb.create = async (tableName, newUser) => {
      return Promise.resolve(newUser);
    };

    const req = {
      params: {
        id: strings.ID
      }
    };

    const jsonSpy = sinon.spy(res, 'json');
    const statusSpy = sinon.spy(res, 'status');

    const controller = controllerModule(mockDb).create;
    await controller(req, res, null);

    expect(jsonSpy.calledOnce).to.equal(true);
    expect(jsonSpy.alwaysCalledWithExactly({ id: strings.ID })).to.equal(true);

    expect(statusSpy.calledOnce).to.equal(true);
    expect(statusSpy.alwaysCalledWithExactly(201)).to.equal(true);

    jsonSpy.restore();
    statusSpy.restore();
  });
});
