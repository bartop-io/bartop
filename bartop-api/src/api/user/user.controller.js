const ajv = require('ajv')({ allErrors: true });
const asyncMiddleware = require('../../utils/asyncMiddleware');
const model = require('./user.model');

module.exports = db => {
  const create = asyncMiddleware(async (req, res, next) => {
    // TODO
    // validate body before anything else?
    // parse the body for the authoid
    // adjust newUser to use authoid as key name instead
    //  actually, if validated correctly, we don't need to build a newUser object at all,
    //  unless we construct it during 'parse the body' and pass that into validate step (i think i like this)
    const newUser = { id: req.params.id };

    // validate the input
    // *** this will be repeated a lot.. should perhaps be a util? - maybe
    // i just dont like not seeing the possiblity of error being thrown..
    // but i guess that is what asyncMiddleware does and that is fine..

    const valid = ajv.validate(model, newUser);
    if (!valid) {
      const invalidError = new Error(JSON.stringify(ajv.errors));
      invalidError.name = 'InvalidInputError';
      throw invalidError;
    }

    const createdUser = await db.create('users', newUser);
    res.status(201).json(createdUser);
  });

  return { create };
};
