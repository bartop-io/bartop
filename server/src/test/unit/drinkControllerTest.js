const expect = require('chai').expect;
const controllerModule = require('../../api/drink/drinkController');
const sinon = require('sinon');

describe('drinks controller - unit test', function(done) {
  it('.getAll - pass data from ORM to response', async function() {
    const mockDb = {};
    const dbResults = [
      {
        ingredients: ['whiskey', 'sugar', 'bitters'],
        name: 'Old Fashioned'
      }
    ];

    mockDb.findAll = async tableName => {
      return Promise.resolve(dbResults);
    };

    const res = {
      json: data => data
    };

    const spy = sinon.spy(res, 'json');

    const controller = controllerModule(mockDb).getAll;
    await controller(null, res, null);

    expect(spy.calledOnce).to.equal(true);
    expect(spy.alwaysCalledWithExactly(dbResults)).to.equal(true);

    spy.restore();
  });
});
