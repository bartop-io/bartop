const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const api = require('./api');
const logger = require('./utils/logger');
const checkJwt = require('./utils/auth');
const constants = require('./utils/stringConstants');

const app = express();

// use helmet to set up some good security practices
app.use(helmet());

// enable all cors requests (for now)
app.use(cors());

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
      logger.error(constants.errors.UNAUTHORIZED);
      res.status(401).json(constants.errors.UNAUTHORIZED);
      break;

    default:
      logger.error(`${err.name}: ${err.message}`);
      res.status(500).json(`${err.name}: ${err.message}`);
  }
});

// setup the server as a module
module.exports = app;
