const processDbResult = require('../../utils/processDbResult');

module.exports = r => {
  // create a new user
  const create = async body => {
    const dbOpResult = await r
      .table('users')
      .insert(body, { returnChanges: true });

    return processDbResult(dbOpResult);
  };

  // list all users
  const list = async () => {
    return await r.table('users');
  };

  return { create, list };
};
