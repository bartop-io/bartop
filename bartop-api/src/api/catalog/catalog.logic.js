const processDbResult = require('../../utils/processDbResult');

module.exports = r => {
  // create a new catalog
  const create = async body => {
    const { userId, drinkIds } = body;
    const dbOpResult = await r
      .table('users')
      .get(userId)
      .update({ catalog: drinkIds }, { returnChanges: true });

    return processDbResult.update(dbOpResult, userId, {
      id: userId,
      catalog: drinkIds
    });
  };

  return { create };
};
