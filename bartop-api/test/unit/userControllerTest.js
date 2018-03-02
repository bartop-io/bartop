const expect = require('chai').expect;
const controllerModule = require('../../src/api/user/user.controller');
const sinon = require('sinon');
const testObjects = require('../utils/testObjects');

describe('users controller - unit test', function(done) {
  it('.create - set correct status code and user object', async function() {
    const mockDb = {};
    const testUser = testObjects.users.testUser;

    mockDb.create = async (tableName, newUser) => {
      return Promise.resolve(newUser);
    };

    const req = {
      params: {
        id: testUser.id
      }
    };

    const res = testObjects.res;
    const jsonSpy = sinon.spy(res, 'json');
    const statusSpy = sinon.spy(res, 'status');

    const controller = controllerModule(mockDb).create;
    await controller(req, res, null);

    expect(jsonSpy.calledOnce).to.equal(true);
    expect(jsonSpy.alwaysCalledWithExactly({ id: testUser.id })).to.equal(true);

    expect(statusSpy.calledOnce).to.equal(true);
    expect(statusSpy.alwaysCalledWithExactly(201)).to.equal(true);

    jsonSpy.restore();
    statusSpy.restore();
  });
});
