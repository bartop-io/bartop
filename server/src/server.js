const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const api = require('./api');
const logger = require('./utils/logger');
const checkJwt = require('./utils/auth');

const app = express();

// use helmet to set up some good security practices
app.use(helmet());

// set up basic logger middleware
// using dev mode for now but this can be easily changed later on
app.use(morgan('dev', { stream: logger.stream }));

// protect the api with jwt authentication
app.use(checkJwt);

// set up the api as middleware
app.use('/api/v1', api);

// global error handling middleware
app.use((err, req, res, next) => {
  switch (err.name) {
    case 'UnauthorizedError':
      logger.error('Request is not authorized.');
      res.status(401).json('Access... DENIED.');
      break;

    default:
      logger.error(`${err.name}: ${err.message}`);
      res.status(500).json('Something broke!');
  }
});

// setup the server as a module
module.exports = app;
