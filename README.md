# BarTop
[![Build Status](https://travis-ci.org/dpopp07/bartop.svg?branch=dev)](https://travis-ci.org/dpopp07/bartop) 
[![Coverage](https://codecov.io/gh/dpopp07/bartop/branch/dev/graph/badge.svg)](https://codecov.io/gh/dpopp07/bartop)  
Web framework for hobbyist and freelance bartenders 🍸

## Table of Contents
* [UI](#ui)
  * [Development](#ui-development)
* [API](#api)
  * [Development](#api-development)

## UI
### UI Development
*These instructions assume you're in the `/bartop-ui` directory*

#### Install the dependencies
`npm install`

#### Environment Variables
The API is configured using a `.env` file. Use the `.env.example` file as a template to create a local version.

1. The `Auth0` environment variables require that you create an [Auth0](https://auth0.com/) tenant. Once created, add the supplied `AUTH0_DOMAIN` and `AUTH0_CLIENT_ID`.
2. Add two [rules](https://auth0.com/docs/rules/current) to your tenant:
    1. The first rule should add the user's `loginsCount` to `idToken`:
    ```javascript
    function(user, context, callback) {
      var namespace = 'https://yournamespace';
      context.idToken[namespace + '/loginsCount'] = context.stats.loginsCount;
      callback(null, user, context);
    }
    ```
    2. The second should add the user's `name` to `idToken`:
    ```javascript
    function (user, context, callback) {
      var namespace = 'https://yournamespace';
      context.idToken[namespace + '/name'] = user.user_metadata && user.user_metadata.name || undefined;
      callback(null, user, context);
    }
    ```
    3. Set your `AUTH0_CLAIM_NAMESPACE` environment variable to the `namespace` you chose in your rules
3. BarTop uses the JWT Tokens provided by Auth0 to secure our API. In order to do this, we need to tell Auth0 who the [audience](https://auth0.com/docs/tokens/access-token#access-token-format) of our `accessToken` is. Set the `AUTH0_BARTOP_API_AUDIENCE` accordingly.
4. For local development, set your `REACT_APP_URL` to http://localhost:3000
5. For local development, set your `REACT_APP_API_URL` to http://localhost:3001. CRA automatically proxies requests to whichever port you specify in the `proxy` field of your `package.json`, so make sure they match.

#### Running the UI
1. Install dependencies with `npm install`
2. Make sure you have all your [environment variables](#environment-variables) set.
3. Run the [API](#api-development)
3. Run the UI with `npm start`
4. Visit http://localhost:3000 to view the UI

    **SIDENOTE** BarTop is using [Create React App](https://github.com/facebook/create-react-app) as the starter for our UI. If you run into problems, please check out their [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) or reach out with questions

#### Testing
1. Execute the UI unit tests with `npm test`
2. Optionally, you can run the tests in watch mode with `npm run watch test`. This is nice when you're working on specific tests and want it to run on changes. 

## API
### API Development
*These instructions assume you're in the `/bartop-api` directory*
#### Install the dependencies
`npm install`

#### Environment Variables

The API is configured using a `.env` file. Use the `.env.example` file as a template to create a local version. Every variable listed in the `.env.example` is _required_ to run the API server.

#### Start the Database
BarTop API uses RethinkDB for its persistence layer. Running the API locally requires a [local of installation of RethinkDB](https://www.rethinkdb.com/docs/install/).
Once installed, start a local instance of the database:
`npm run database`

The default database, named `test`, is reserved for running the integration tests. Using this as your development database will have pretty unfortunate consequences, so you will want to create a new one.
To create a new database use the [RethinkDB dashboard](http://localhost:8080/#tables) (while the database is running). Click on `+ Add Database` and enter your desired development database name. Make sure the name of this database matches the BARTOP_DB_NAME variable in your `.env` file.

#### Run the server locally
First, make sure the database is running. Then, start the API server:
`npm start`
The API will be available for requests at http://localhost:3001 (if you set BARTOP_API_PORT to 3001 in your `.env` file).

#### Test the API
The API test suite consists of both unit tests and integration tests.
To run the full test suite, use:
`npm run test-all`

##### Unit tests
These are used to test the controller logic for each endpoint. To run the unit tests, simply run:
`npm test`

##### Integration Tests
These are used to test actual functionality of the API server by making requests and verifying responses with as little mocking as possible. To run the integration tests, run:
`npm run integration-tests`
To run the integration tests, you _must_ be running a local instance of RethinkDB. See [this section](#starting-the-database) for more information.

##### Testing with CI
Travis CI will automatically run all tests (using `npm run test-all`) when a branch is pushed.

