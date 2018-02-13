const prepare = require('mocha-prepare');
const getToken = require('./utils/getTestToken');
const dbAdapter = require('../src/db/adapter');

/*

  First function passed into `prepare` is the global `before`
  - It requests a test token from auth0 to use for the tests

  Second function passed into `prepare` is the global `after`
  - It drains the connection pool so the process exits correctly

*/

prepare(
  async function(done) {
    global.testToken = await getToken();
    done();
  },
  async function(done) {
    await dbAdapter.r.getPoolMaster().drain();
    done();
  }
);
