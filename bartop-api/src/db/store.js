const Container = require('js-data').Container;
const adapter = require('./adapter');

// Create a store to hold your Mappers
const store = new Container();

// Mappers in "store" will use the RethinkDB adapter by default
store.registerAdapter('rethinkdb', adapter, { default: true });

// a mapper must be defined for each table
store.defineMapper('users');
store.defineMapper('drinks');
store.defineMapper('catalogs');

module.exports = store;
