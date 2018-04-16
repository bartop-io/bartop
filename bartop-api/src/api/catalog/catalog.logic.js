const processDbResult = require('../../utils/processDbResult');

module.exports = r => {
  // create a new catalog
  const replace = async body => {
    const { userId, drinkIds } = body;
    const dbOpResult = await r
      .table('users')
      .get(userId)
      .update({ catalog: drinkIds }, { returnChanges: true });

    let finalResult = processDbResult(dbOpResult, userId);
    if (finalResult.unchanged) {
      finalResult = { catalog: drinkIds, unchanged: true };
    } else {
      finalResult = { catalog: finalResult.catalog };
    }

    return finalResult;
  };

  return { replace };
};
