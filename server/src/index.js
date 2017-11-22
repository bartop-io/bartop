const config = require('../config');
const app = require('./server');
const seed = require('./utils/seed');

const port = config.api.port;

// ##### for development only #####
if (config.env === 'development') {
  seed();
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
