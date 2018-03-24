const expect = require('chai').expect;
const sinon = require('sinon');
const controllerModule = require('../../src/api/user/user.controller');
const { res, req, users } = require('../utils/testObjects');

describe('users controller - unit test', function(done) {
  it('.create() - set correct status code and user object', async function() {
    const mockDb = {};
    mockDb.create = async (tableName, newUser) => {
      return Promise.resolve(newUser);
    };

    req.body = { auth0Id: users.testUser.auth0Id };

    const jsonSpy = sinon.spy(res, 'json');
    const statusSpy = sinon.spy(res, 'status');

    const controller = controllerModule(mockDb).create;
    await controller(req, res, null);

    expect(jsonSpy.calledOnce).to.equal(true);
    expect(
      jsonSpy.alwaysCalledWithExactly({ auth0Id: users.testUser.auth0Id })
    ).to.equal(true);

    expect(statusSpy.calledOnce).to.equal(true);
    expect(statusSpy.alwaysCalledWithExactly(201)).to.equal(true);

    jsonSpy.restore();
    statusSpy.restore();
  });

  it('.list() - pass data from ORM to response', async function() {
    const dbResults = users.userList;
    const mockDb = {};

    mockDb.findAll = async tableName => {
      return Promise.resolve(dbResults);
    };

    const jsonSpy = sinon.spy(res, 'json');
    const statusSpy = sinon.spy(res, 'status');

    const controller = controllerModule(mockDb).list;
    await controller(null, res, null);

    expect(jsonSpy.calledOnce).to.equal(true);
    expect(jsonSpy.alwaysCalledWithExactly({ items: dbResults })).to.equal(
      true
    );

    expect(statusSpy.calledOnce).to.equal(true);
    expect(statusSpy.alwaysCalledWithExactly(200)).to.equal(true);

    jsonSpy.restore();
    statusSpy.restore();
  });
});
