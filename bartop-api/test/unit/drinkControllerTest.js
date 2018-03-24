const expect = require('chai').expect;
const sinon = require('sinon');
const controllerModule = require('../../src/api/drink/drink.controller');
const { res, drinks } = require('../utils/testObjects');

describe('drinks controller - unit test', function(done) {
  it('.list() - pass data from ORM to response', async function() {
    const dbResults = drinks.drinkList;
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
