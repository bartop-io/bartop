const expect = require('chai').expect;
const seed = require('../../src/utils/seed');
const r = require('../../src/db');
const seeds = require('../utils/testObjects');

describe('Seeding module - for dev only', function() {
  before(async function() {
    // increase hook timeout, tests require extensive environment setup
    this.timeout(9000);

    // prime the database by dropping all the tables
    const tables = await r.tableList();
    for (const table of tables) {
      await r.tableDrop(table);
    }
    return;
  });

  it('should create all the tables correctly', async function() {
    await seed();
    const tablesInDatabase = await r.tableList();
    const drinks = await r.table('drinks');
    expect(tablesInDatabase.length).to.equal(seeds.dbTables.length);
    expect(drinks.length).to.equal(seeds.drinks.list.length);
    return;
  });
});
