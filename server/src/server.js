const express = require('express');
const morgan = require('morgan');
const api = require('./api');

const app = express();

// set up basic logger middleware
// using dev mode for now but this can be easily changed later on
app.use(morgan('dev'));

// set up the api as middleware
app.use('/api/v1', api);

// global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json('Something broke!');
});

// setup the server as a module for testing
module.exports = app;
