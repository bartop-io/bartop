const findUser = require('../../utils/validators/userExists');

module.exports = db => {
  // create a new catalog
  const create = async postBody => {
    const { userId, drinkIds } = postBody;
    const userToUpdate = await findUser(db, userId);
    userToUpdate.catalog = drinkIds;
    return await db.update('users', userId, userToUpdate);
  };

  return { create };
};
