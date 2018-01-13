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
    audience: process.env.AUDIENCE,
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    grant: process.env.GRANT_TYPE
  }
};

function envFileIsValid() {
  return (
    process.env.API_PORT &&
    process.env.DB_HOST &&
    process.env.DB_PORT &&
    process.env.DB_NAME &&
    process.env.AUDIENCE &&
    process.env.CLIENT_ID &&
    process.env.CLIENT_SECRET &&
    process.env.GRANT_TYPE
  );
}
