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
      const newError = new Error();
      newError.name = 'ResourceNotFoundError';
      newError.message = `Resource with ID: ${id} does not exist.`;
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
