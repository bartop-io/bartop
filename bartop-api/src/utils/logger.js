const { createLogger, format, transports } = require('winston');

// silence the logger on tests
const trueIfTest = process.env.NODE_ENV === 'test';

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({
      silent: trueIfTest
    })
  ],
  format: format.combine(format.colorize(), format.simple())
});

// provide a standard logging function to send 3rd party logs
// through winston (rethinkdb, morgan, etc)
logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  }
};

module.exports = logger;
