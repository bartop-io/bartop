const winston = require('winston');

// silence the logger on tests
const trueIfTest = process.env.NODE_ENV === 'test';

const logger = new winston.Logger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      json: false,
      colorize: true,
      silent: trueIfTest
    })
  ]
});

// provide a standard logging function to send 3rd party logs
// through winston (rethinkdb, morgan, etc)
logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  }
};

module.exports = logger;
