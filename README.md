# BarTop
[![Build Status](https://travis-ci.org/dpopp07/bartop.svg?branch=dev)](https://travis-ci.org/dpopp07/bartop) 
[![Coverage](https://codecov.io/gh/dpopp07/bartop/branch/dev/graph/badge.svg)](https://codecov.io/gh/dpopp07/bartop)  
Web framework for hobbyist and freelance bartenders 🍸

## Development

### Installing Dependencies
`npm install` - installs the root, server, and client dependencies

### Starting the Database
BarTop uses RethinkDB for its persistence layer. Running this app locally requires a local of installation of RethinkDB.

[Install RethinkDB.](https://www.rethinkdb.com/docs/install/)

Once installed, start a local instance of the database:
* `npm run database`

The default database, 'test', is reserved for running the integration tests. Using this as your development DB will have pretty unfortunate consequences.

To create a new database use the [RethinkDB dashboard](http://localhost:8080/#tables). Click on `+ Add Database` and enter your desired development database name. Make sure the name of this database matches the DB_NAME variable in your `.env` file. Note: The database must be running to use the browser-based dashboard.

Make sure to start the database before starting the API server.

### Running the App Locally
BarTop runs on two servers - one serving the client and one serving our API.
`npm start` - concurrently runs:
* `npm run server` - the server at http://localhost:3001
* `npm run client` - the client at http://localhost:3000

### Environment Variables

The app is configured using `.env` files in both the client/ and server/ directories. Use the `.env.example` files in each respective directory as templates to create local versions.

### Testing
#### Unit Tests
`npm test` - concurrently runs the unit tests:
* `npm run test-server` - the server tests
* `npm run test-client` - the client tests in non-interactive mode

#### Integration Tests
`npm run test-all` - concurrently runs the unit and integration tests.
To run the integration tests, you _must_ be running a local instance of RethinkDB. See [this section](#starting-the-database) for more information.
Travis CI will automatically run all tests (using this command) when a branch is pushed.

