const enforceContentType = require('./contentType');
const enforceBodyModel = require('./bodyModel');

// on post operations, validate the content-type
// and ensure the body follows the model format
// other operations may have different needs
module.exports.onPost = (req, model) => {
  enforceContentType(req);
  enforceBodyModel(req.body, model);
};
