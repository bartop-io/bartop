const express = require('express');
const morgan  = require('morgan');
const api     = require('./api/api');

const app = express();
// set up a logger
// using dev mode for now but this can be easily changed later on
app.use(morgan('dev'));

// set up the api as middleware
app.use('/api/v1', api);

// setup the server as a module for testing
module.exports = app;