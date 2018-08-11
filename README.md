# BarTop
[![Build Status](https://api.travis-ci.org/bartop-io/bartop.svg?branch=dev)](https://travis-ci.org/bartop-io/bartop) 
[![Coverage](https://codecov.io/gh/bartop-io/bartop/branch/dev/graph/badge.svg)](https://codecov.io/gh/bartop-io/bartop)  
Web framework for hobbyist and freelance bartenders 🍸

## Table of Contents
* [UI](#ui)
  * [Development](#ui-development)
    * [Developing with Storybook](#ui-development-with-storybook)
    * [Integrated Development](#integrated-ui-development)
  * [Deployment](#ui-deployment)
* [API](#api)
  * [Development](#api-development)

## UI
### UI Development
*These instructions assume you're in the `/bartop-ui` directory*.

### UI Development with Storybook
The UI has a [Storybook](https://storybook.js.org/) for quickly designing & developing components. If you just want to make some visual changes, this is the fastest & easiest way.
1. Install the dependencies - `npm install`
2. Run the storybook - `npm run storybook`
3. View the storybook at [localhost:9001](http://localhost:9001)

### Integrated UI Development
In order to develop for the UI with auth & data, you need to establish an [Auth0](https://auth0.com/) tenant and run the [API](#api-development). Read below for instructions to setup this full system. 
#### Install the dependencies
`npm install`

### UI Deployment

The UI is continuously deployed at the following URLs:

https://dev.bartop.io -> pushes to `dev` deploy here

https://bartop.io -> pushes to `prod` deploy here (but currently redirecting to this repo)

When a PR is made against these branches, [Netlify](netlify.com) will [deploy a preview](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) that can be used for testing & validating the bug fix or feature.

#### Environment Variables
The UI is configured using a `.env` file. Use the `.env.example` file as a template to create a local version.

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
1. Make sure you have all your [environment variables](#environment-variables) set.
2. Run the [API](#api-development)
3. Run the UI with `npm start`
4. Visit http://localhost:3000 to view the UI

    **SIDENOTE** BarTop is using [Create React App](https://github.com/facebook/create-react-app) as the starter for our UI. If you run into problems, please check out their [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) or reach out with questions

#### Testing
1. Execute the UI unit tests with `npm test`
2. Optionally, you can run the tests in watch mode with `npm run watch-test`. This is nice when you're working on specific tests and want it to run on changes.
3. When making visual changes, it can help to view the [storybook](#ui-development-with-storybook) to play with components in an isolated environment.

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
To create a new database use the [RethinkDB dashboard](http://localhost:8080/#tables) (while the database is running). Click on `+ Add Database` and enter your desired development database name. Make sure the name of this database matches the BARTOP_DB_NAME variable in your `.env` file. This dashboard is also useful for exploring your data.

#### Run the server locally
First, make sure the database is running. Then, start the API server:
`npm start`
The API will be available for requests at http://localhost:3001 (if you set BARTOP_API_PORT to 3001 in your `.env` file, which is recommended). Requests to the API in development do not need to be authorized. For testing and production, the API requires authentication/authorization using JSON Web Tokens.

_Note_ Starting the API in development mode will automatically configure the database to assist with client development. The first time the server is started with a fresh database, it will create the following tables:
- `users`
- `drinks`
- `menus`
- `sessions`
- `orders`

and will seed the `drinks` table with [sample drink objects](bartop-api/test/utils/testObjects/drink/index.js).

##### Explore the v1 REST API
The REST API is available under the route `/api/v1`. Use a tool like [Postman](https://www.getpostman.com/apps) to test different endpoints. Documentation coming soon...

##### Explore the GraphQL API
The GraphQL API is available under the single endpoint `/api/graphql`. The recommended way to explore this API is using the GraphIQL tool, available by visiting [the above route](http://localhost:3001/api/graphql) in a browser. Here, there is an environment to test queries alongside a panel with documentation. If desired, the GraphQL API can also be explored using a tool like Postman.

#### Test the API
The API test suite currently consists of mostly integration tests and some unit tests.

The integration tests are used to test actual functionality of the API server by making requests and verifying responses with as little mocking as possible.

The unit tests are used to test individual modules, especially behavior that is very difficult to produce in the integration tests (like RethinkDB post-write errors) but still needs to be accounted for.

To run the full test suite: `npm run test`  
To run the integration tests: `npm run integration-tests`  
To run the unit tests: `npm run unit-tests`

To run the integration tests, you _must_ be running a local instance of RethinkDB. See [this section](#starting-the-database) for more information.

##### Testing with CI
Travis CI will automatically run all tests when a branch is pushed.

