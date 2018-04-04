const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const api = require('./api');
const logger = require('./utils/logger');
const checkJwt = require('./utils/auth');
const errors = require('./utils/errorConstants');

const app = express();

// parse json request bodies
app.use(bodyParser.json());

// compress all responses
app.use(compression());

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
app.use('/api', api);

// handle all incorrect routes
app.all('*', (req, res, next) => {
  const err = new Error();
  err.name = 'RouteNotFoundError';
  next(err);
});

// global error handling middleware
app.use((err, req, res, next) => {
  switch (err.name) {
    case 'RouteNotFoundError':
      logger.error(errors.NONEXISTENT.message);
      res.status(errors.NONEXISTENT.code).json(errors.NONEXISTENT.message);
      break;

    case 'ResourceNotFoundError':
      logger.error(errors.NOT_FOUND.message);
      res.status(errors.NOT_FOUND.code).json(errors.NOT_FOUND.message);
      break;

    case 'UnauthorizedError':
      logger.error(errors.UNAUTHORIZED.message);
      res.status(errors.UNAUTHORIZED.code).json(errors.UNAUTHORIZED.message);
      break;

    case 'InvalidModelError':
      logger.error(errors.BODY_MODEL.message);
      // the 'message' property of `err` is an array or objects, we want to get key
      // 'message' from within this object
      //logger.error(`${err.name}: ${err.message}`);
      // ^ will be resolved in #92
      res.status(errors.BODY_MODEL.code).json(errors.BODY_MODEL.message);
      break;

    case 'InvalidContentTypeError':
      logger.error(`${err.name}: ${err.message}`);
      logger.error(errors.CONTENT_TYPE.message);
      res.status(errors.CONTENT_TYPE.code).json(errors.CONTENT_TYPE.message);
      break;

    default:
      logger.error(`${err.name}: ${err.message}`);
      res.status(500).json(`${err.name}: ${err.message}`);
  }
});

module.exports = app;
