const drinkTestObjects = require('./drink');
const userTestObjects = require('./user');

// create a list of tables that can be assumed to exist at any given time
const tables = ['drinks', 'catalogs', 'menus', 'orders', 'sessions', 'users'];

module.exports.dbTables = tables;
module.exports.drinks = drinkTestObjects;
module.exports.users = userTestObjects;
