const processDbResult = require('../../utils/processDbResult');

const TABLE_NAME = 'users';

module.exports = r => {
  // create a new user
  const create = async body => {
    const dbOpResult = await r
      .table(TABLE_NAME)
      .insert(body, { returnChanges: true });

    return processDbResult(dbOpResult);
  };

  // list all users
  const list = async () => {
    // intentionally not resolving catalogs here to save
    // bandwidth. this can change in the future if need be
    return await r.table(TABLE_NAME);
  };

  // get a user by the db-generated id
  // will be `null` if user does not exist
  const get = async id => {
    const user = await r.table(TABLE_NAME).get(id);
    // resolve drink objects in the catalog
    if (user && user.catalog) {
      const drinks = await r.table('drinks').getAll(...user.catalog);
      user.catalog = drinks;
    }
    return user;
  };

  return { create, list, get };
};
