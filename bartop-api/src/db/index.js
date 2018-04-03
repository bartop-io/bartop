const rethink = require('rethinkdbdash');
const dbInfo = require('../../config').database;
const logger = require('../utils/logger');

// route the db logging through winston
dbInfo.silent = true;
dbInfo.log = logger.stream.write;

// this creates a connection to the database
module.exports = rethink({
  rOpts: dbInfo
});
