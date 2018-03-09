module.exports = {
  UNAUTHORIZED: {
    message: 'Request is not authorized.',
    code: 401
  },
  NONEXISTENT: {
    message: 'This route does not exist.',
    code: 404
  },
  CONTENT_TYPE: {
    message: 'Invalid content type.',
    code: 406
  },
  BODY_MODEL: {
    message: 'Invalid model found in body.',
    code: 422
  }
};
