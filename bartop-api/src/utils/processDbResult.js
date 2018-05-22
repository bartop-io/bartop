const throwError = require('./errorCreator');

module.exports = (dbOpResult, id = '') => {
  let result = {};
  if (!dbOpResult.changes.length) {
    if (dbOpResult.unchanged) {
      // the resource was already the exact same
      result = { unchanged: true };
    } else if (dbOpResult.skipped) {
      // the id doesn't exist in the db
      throwError.notFound(id);
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
