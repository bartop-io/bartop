const expect = require('chai').expect;
const sinon = require('sinon');
const controllerModule = require('../../src/api/drink/drink.controller');
const testObjects = require('../utils/testObjects');

describe('drinks controller - unit test', function(done) {
  it('.list - pass data from ORM to response', async function() {
    // set up an object to be mocked in the response
    const dbResults = testObjects.drinks.array;
    const mockDb = {};

    mockDb.findAll = async tableName => {
      return Promise.resolve(dbResults);
    };

    const res = testObjects.res;

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
