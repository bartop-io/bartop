const processDbResult = require('../../utils/processDbResult');

module.exports = r => {
  // replace a catalog with a new one (used to initialize catalogs also)
  const replace = async body => {
    const { userId, drinkIds } = body;
    const dbOpResult = await r
      .table('users')
      .get(userId)
      .update({ catalog: drinkIds }, { returnChanges: true });

    let finalResult = processDbResult(dbOpResult, userId);
    if (finalResult.unchanged) {
      finalResult = { unchanged: true };
    } else if (finalResult.catalog) {
      const drinks = await r.table('drinks').getAll(...finalResult.catalog);
      finalResult = { catalog: drinks };
    }
    return finalResult;
  };

  return { replace };
};
