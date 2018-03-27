const ajv = require('ajv')({ allErrors: true });

module.exports = (body, model) => {
  if (!ajv.validate(model, body)) {
    const newError = new Error(JSON.stringify(ajv.errors));
    newError.name = 'InvalidModelError';
    throw newError;
  }
};
