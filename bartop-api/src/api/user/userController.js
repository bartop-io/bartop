const ajv = require('ajv')({ allErrors: true });
const asyncMiddleware = require('../../utils/asyncMiddleware');
const model = require('./userModel');

module.exports = db => {
  const create = asyncMiddleware(async (req, res, next) => {
    const userToCreate = { id: req.params.id };

    // validate the input
    // *** this will be repeated a lot.. should perhaps be a util?
    // *** do objects coming out of the db (get) need to be validated?
    /*
      thoughts!

      this doesn't need to be tested. i am explicitly creating the object so it will never be invalid
      this begs the question, if this doesn't need a test - is it a necessary feature? obviously the 
      validator belongs in the app, but maybe not at this endpoint. the only way this validator would
      be useful is if it were able to validate a proper userID. then it would be functional and testable.
      I should talk to James about whether or not that could be a thing.

    */
    const valid = ajv.validate(model, userToCreate);
    if (!valid) {
      const invalidError = new Error(JSON.stringify(ajv.errors));
      invalidError.name = 'InvalidInputError';
      throw invalidError;
    }

    const createdUser = await db.create('users', userToCreate);
    res.status(201).json(createdUser);
  });

  return { create };
};
