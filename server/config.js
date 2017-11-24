require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';

let dbName;
environment === 'test' ? (dbName = 'test') : (dbName = process.env.DB_NAME);

module.exports = {
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    db: dbName
  },
  api: {
    port: process.env.API_PORT
  },
  env: environment
};
