const config = require('../config');
const app = require('./server');
const seed = require('./utils/seed');
const logger = require('./utils/logger');

const port = config.api.port;

// ##### for development only #####
if (config.env === 'development') {
  seed().catch(err => {
    logger.error(err);
    logger.info(
      'An error occurred seeding the DB. The DB state may not be as expected.'
    );
  });
}

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
