# BarTop
[![Build Status](https://travis-ci.org/dpopp07/bartop.svg?branch=dev)](https://travis-ci.org/dpopp07/bartop) 
[![Coverage](https://codecov.io/gh/dpopp07/bartop/branch/dev/graph/badge.svg)](https://codecov.io/gh/dpopp07/bartop)  
Web framework for hobbyist and freelance bartenders 🍸

## Table of Contents
* [UI](#ui)
  * [Development](#ui-development)
* [API](#api)

## UI
### UI Development
*These instructions assume you're in the `/bartop-ui` directory*
#### Running the UI
1. Install dependencies with `npm install`
2. The UI depends on the `.env` file located in `bartop-ui/.env`. Use the `bartop-ui/.env.example` file to structure your `.env`. Create an [Auth0](https://auth0.com/) tenant and add the appropriate permissions, and then add the corresponding `.env.` variables. We're working on an isolated dev environment so there isn't so much overhead to contribute, please check back soon :)
3. Run the BarTop UI with `npm start`
4. Visit http://localhost:3000 to view the BarTop UI
5. ** BarTop is using [Create React App](https://github.com/facebook/create-react-app) as the starter for our UI. If you run into problems, please check out their [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) or hit us up with questions

#### Testing
1. Execute the UI unit tests with `npm test`

## API
### API Development

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

### Environment Variables

The app is configured using `.env` files in both the client/ and server/ directories. Use the `.env.example` files in each respective directory as templates to create local versions.

### Running the App Locally
BarTop runs on two servers - one serving the client and one serving our API.
* `npm run server` - starts the API server at http://localhost:3001
* `npm run client` - starts the client server at http://localhost:3000

### Testing
#### Unit Tests
`npm test` - sequentially runs the unit tests:
* `npm run test-server` - the server tests
* `npm run test-client` - the client tests in non-interactive mode

#### Integration Tests
`npm run test-all` - sequentially runs the unit and integration tests.
To run the integration tests, you _must_ be running a local instance of RethinkDB. See [this section](#starting-the-database) for more information.
Travis CI will automatically run all tests (using this command) when a branch is pushed.

