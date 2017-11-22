require('dotenv').config();

// only set NODE_ENV to production
const environment = process.env.NODE_ENV || 'development';

module.exports = {
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    db: process.env.DB_NAME
  },
  api: {
    port: process.env.API_PORT
  },
  env: environment
};
