require('dotenv').config();
const logger = require('./src/utils/logger');

/*
*   possible environments are:
*     local       : for developing on a personal machine (default)
*     test        : for testing, either locally or with ci
*     development : for the deployed development instance of the API
*     production  : for the deployed production instance of the API
*/

const environment = process.env.NODE_ENV || 'local';

let dbName;
switch (environment) {
  case 'production':
    dbName = process.env.BARTOP_DB_NAME_PROD;
    break;

  case 'test':
    dbName = 'test';
    break;

  default:
    // using same name for 'local' and 'development'
    dbName = process.env.BARTOP_DB_NAME_DEV;
}

let dbHost;
switch (environment) {
  case 'development':
    dbHost = process.env.BARTOP_DB_HOST_DEV;
    break;

  case 'production':
    dbHost = process.env.BARTOP_DB_HOST_PROD;
    break;

  default:
    // environments would be 'local' or 'test'
    dbHost = 'localhost';
}

if (!envFileIsValid()) {
  logger.error(
    ' necessary server environment variables not defined\n',
    'see bartop-api/.env.example for the expected variables'
  );
  process.exit(1);
}

module.exports = {
  database: {
    host: dbHost,
    port: process.env.BARTOP_DB_PORT,
    db: dbName
  },
  api: {
    port: process.env.BARTOP_API_PORT
  },
  env: environment,
  auth: {
    audience: process.env.BARTOP_API_AUDIENCE,
    id: process.env.BARTOP_API_CLIENT_ID,
    secret: process.env.BARTOP_API_CLIENT_SECRET,
    grant: process.env.BARTOP_API_GRANT_TYPE
  }
};

function envFileIsValid() {
  return (
    process.env.BARTOP_API_PORT &&
    process.env.BARTOP_DB_PORT &&
    process.env.BARTOP_API_AUDIENCE &&
    process.env.BARTOP_API_CLIENT_ID &&
    process.env.BARTOP_API_CLIENT_SECRET &&
    process.env.BARTOP_API_GRANT_TYPE &&
    dbHost &&
    dbName
  );
}
