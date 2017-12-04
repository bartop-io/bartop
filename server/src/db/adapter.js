const RethinkDBAdapter = require('js-data-rethinkdb').RethinkDBAdapter;
const dbInfo = require('../../config').database;
const logger = require('../utils/logger');

// route the db logging through winston
dbInfo.silent = true;
dbInfo.log = logger.stream.write;

// this creates a connection to the database
module.exports = new RethinkDBAdapter({
  rOpts: dbInfo
});
