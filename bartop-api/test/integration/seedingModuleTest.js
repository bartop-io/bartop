const expect = require('chai').expect;
const seed = require('../../src/utils/seed');
const dbAdapter = require('../../src/db/adapter');
const seeds = require('../utils/testObjects');

describe('Seeding module - for dev only', function() {
  before(async function() {
    // increase hook timeout, tests require extensive environment setup
    this.timeout(9000);

    // prime the database by dropping all the tables
    const tables = await dbAdapter.r.tableList();
    for (const table of tables) {
      await dbAdapter.r.tableDrop(table);
    }
    return;
  });

  it('should create all the tables correctly', async function() {
    await seed();
    const tablesInDatabase = await dbAdapter.r.tableList();
    const drinks = await dbAdapter.r.table('drinks');
    expect(tablesInDatabase.length).to.equal(seeds.dbTables.length);
    expect(drinks.length).to.equal(seeds.drinks.list.length);
    return;
  });
});
