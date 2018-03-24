// this may become route specific so it could
// become something that is passed in.
// for now we are only supporting json
const supportedTypes = ['application/json'];

module.exports = req => {
  const contentType = req.header('Content-Type');
  let newError;
  if (!contentType) {
    newError = new Error('This request must specify a Content-Type.');
  } else if (!supportedTypes.includes(contentType)) {
    newError = new Error(`This request does not accept ${contentType}.`);
  }
  if (newError) {
    newError.name = 'InvalidContentTypeError';
    throw newError;
  }
};
