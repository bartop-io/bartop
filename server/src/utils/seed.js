const dbAdapter = require('../db/adapter');

// put one drink into the database by default
const drink = {
  name: 'Old Fashioned',
  ingredients: ['whiskey', 'sugar', 'bitters']
};

// create a list of tables that can be assumed to exist at any given time
// note: the drinks table is created later on
const expectedTables = [
  'catalogs',
  'menus',
  'orders',
  'sales',
  'sessions',
  'users'
];

// seed the database for development use
async function seed() {
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
        .then(console.log(`  > '${table}' table created.`));
    });

    // create the tables
    await Promise.all(promises);

    // add 'drinks' as separate table and use the name as the primary key
    if (!existingTables.includes('drinks')) {
      await dbAdapter.r.tableCreate('drinks', { primaryKey: 'name' });
      console.log(`  > 'drinks' table created.`);
    }

    // add the default drink
    const res = await dbAdapter.r.table('drinks').insert(drink);
    if (res.inserted === 1) {
      console.log(`    > default drink added to 'drinks' table.`);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = seed;
