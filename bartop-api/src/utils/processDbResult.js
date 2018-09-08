const logger = require('./logger');

module.exports = (dbOpResult, id = '') => {
  let result = {};
  if (successfulOperation(dbOpResult)) {
    // if changes were requested, return them
    if (dbOpResult.changes) {
      result = dbOpResult.changes[0].new_val;
    }
  } else {
    if (dbOpResult.skipped) {
      // the id doesn't exist in the db
      logger.error(`Resource not found: ${id}`);
      result.error = { message: 'Resource not found.', id: [id] };
    } else if (dbOpResult.errors) {
      // unexpected post-write error in the db operation
      logger.error('Rethink Post-Write Error');
      logger.debug(dbOpResult.first_error);
      result.error = { message: 'Something went wrong.' };
    } else {
      // this should never happen
      logger.error('Internal Database Operation Error');
      logger.debug(JSON.stringify(dbOpResult, null, 2));
      result.error = { message: 'Something went wrong.' };
    }
  }

  return result;
};

function successfulOperation(obj) {
  return (
    obj.replaced ||
    obj.inserted ||
    obj.deleted ||
    obj.unchanged ||
    (obj.changes && obj.changes.length)
  );
}
