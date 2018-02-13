require('dotenv').config();
const logger = require('./src/utils/logger');

const environment = process.env.NODE_ENV || 'development';

if (!envFileIsValid()) {
  logger.error(
    ' necessary server environment variables not defined\n',
    'see server/.env.example for the expected variables'
  );
  process.exit(1);
}

let dbName;
environment === 'test'
  ? (dbName = 'test')
  : (dbName = process.env.BARTOP_DB_NAME);

module.exports = {
  database: {
    host: process.env.BARTOP_DB_HOST,
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
    process.env.BARTOP_DB_HOST &&
    process.env.BARTOP_DB_PORT &&
    process.env.BARTOP_DB_NAME &&
    process.env.BARTOP_API_AUDIENCE &&
    process.env.BARTOP_API_CLIENT_ID &&
    process.env.BARTOP_API_CLIENT_SECRET &&
    process.env.BARTOP_API_GRANT_TYPE
  );
}
