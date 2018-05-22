module.exports.notFound = id => {
  const newError = new Error();
  newError.name = 'ResourceNotFoundError';
  newError.message = `Resource with ID:${id} does not exist.`;
  throw newError;
};
