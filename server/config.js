require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';

if (!envFileIsValid()) {
  console.error(
    ' necessary server environment variables not defined\n',
    'see server/.env.example for the expected variables'
  );
  process.exit(1);
}

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
  env: environment,
  auth: {
    audience: process.env.AUTH0_AUDIENCE,
    test: process.env.TEST_TOKEN
  }
};

function envFileIsValid() {
  return (
    process.env.API_PORT &&
    process.env.DB_HOST &&
    process.env.DB_PORT &&
    process.env.DB_NAME &&
    process.env.AUTH0_AUDIENCE &&
    process.env.TEST_TOKEN
  );
}
