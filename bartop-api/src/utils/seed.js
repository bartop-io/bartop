const r = require('../db');
const logger = require('./logger');
const seeds = require('../../test/utils/testObjects');

// create a list of tables that can be
// assumed to exist at any given time
const expectedTables = seeds.dbTables;

// seed the database for development use
const seed = async () => {
  const existingTables = await r.tableList();

  // determine what expected tables are missing from the db
  const neededTables = expectedTables.filter(table => {
    return !existingTables.includes(table);
  });

  // get together a bunch of promises to create tables
  const promises = neededTables.map(table => {
    return r
      .tableCreate(table)
      .then(logger.info(`  > '${table}' table created.`));
  });

  // create the tables
  await Promise.all(promises);

  // add the default drink
  const existingDrinks = await r.table('drinks');
  if (!existingDrinks.length) {
    const res = await r.table('drinks').insert(seeds.drinks.list);
    if (res.inserted === seeds.drinks.list.length) {
      logger.info(`  > default drinks added to 'drinks' table.`);
    } else {
      throw new Error('Default drinks were not added to the database.');
    }
  }
  logger.info('Dev DB is good to go!');
};

module.exports = seed;
