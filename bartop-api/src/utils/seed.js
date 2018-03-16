const dbAdapter = require('../db/adapter');
const logger = require('./logger');
const seeds = require('../../test/utils/testObjects');

// create a list of tables that can be assumed to exist at any given time
const expectedTables = [
  'drinks',
  'catalogs',
  'menus',
  'orders',
  'sessions',
  'users'
];

// seed the database for development use
const seed = async () => {
  try {
    const existingTables = await dbAdapter.r.tableList();

    // determine what expected tables are missing from the db
    const neededTables = expectedTables.filter(table => {
      return !existingTables.includes(table);
    });

    // get together a bunch of promises to create tables
    const promises = neededTables.map(table => {
      return dbAdapter.r
        .tableCreate(table)
        .then(logger.info(`  > '${table}' table created.`));
    });

    // create the tables
    await Promise.all(promises);

    // add the default drink
    const existingDrinks = await dbAdapter.r.table('drinks');
    if (!existingDrinks.length) {
      const res = await dbAdapter.r
        .table('drinks')
        .insert(seeds.drinks.drinkList);

      if (res.inserted === seeds.drinks.drinkList.length) {
        logger.info(`  > default drinks added to 'drinks' table.`);
      }
    }
    logger.info('Dev DB is good to go!');
  } catch (err) {
    logger.error(err);
  }
};

module.exports = seed;
