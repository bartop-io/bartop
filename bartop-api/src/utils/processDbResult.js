const merge = require('lodash.merge');

module.exports.update = (dbOpResult, id, body) => {
  let result = {};
  if (!dbOpResult.changes.length) {
    if (dbOpResult.unchanged) {
      // the catalog was already the exact same
      result = merge(body, { metadata: { unchanged: true } });
    } else if (dbOpResult.skipped) {
      // the userid doesn't exist in the db
      const newError = new Error();
      newError.name = 'ResourceNotFoundError';
      newError.message = `Resource with ID:${id} does not exist.`;
      throw newError;
    } else if (dbOpResult.errors) {
      // unexpected post-write error in the db operation
      const newError = new Error(dbOpResult.first_error);
      newError.name = 'RethinkPostWriteError';
      throw newError;
    } else {
      // this should never happen
      const newError = new Error(JSON.stringify(dbOpResult, null, 2));
      newError.name = 'InternalDatabaseOperationError';
      throw newError;
    }
  } else {
    // if successfully updated, returned updated object
    result = dbOpResult.changes[0].new_val;
  }

  return result;
};
