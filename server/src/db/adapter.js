const RethinkDBAdapter = require('js-data-rethinkdb').RethinkDBAdapter;
const dbinfo = require('../../config').database;

// this creates a connection to the database
module.exports = new RethinkDBAdapter({
  rOpts: dbinfo
});
