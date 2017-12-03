const config = require('../config');
const app = require('./server');
const seed = require('./utils/seed');
const logger = require('./utils/logger');

const port = config.api.port;

// ##### for development only #####
if (config.env === 'development') {
  seed();
}

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
