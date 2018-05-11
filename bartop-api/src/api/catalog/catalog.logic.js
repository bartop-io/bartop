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

  const add = async body => {
    const { userId, drinkId } = body;
    const drink = await r.table('drinks').get(drinkId);
    const finalResult = {};
    if (!drink) {
      finalResult.invalidDrink = true;
    } else {
      const dbOpResult = await r
        .table('users')
        .get(userId)
        .update({
          // setInsert returns an array of distinct values
          // this prevents duplication
          catalog: r.row('catalog').setInsert(drinkId)
        });
      const processed = processDbResult(dbOpResult, userId);
      if (processed.unchanged) {
        finalResult.unchanged = true;
      }
      finalResult.drink = drink;
    }
    return finalResult;
  };

  const remove = async body => {
    const { userId, drinkId } = body;
    const drink = await r.table('drinks').get(drinkId);
    const finalResult = {};
    if (!drink) {
      finalResult.invalidDrink = true;
    } else {
      const dbOpResult = await r
        .table('users')
        .get(userId)
        .update({
          catalog: r.row('catalog').difference([drinkId])
        });
      const processed = processDbResult(dbOpResult, userId);
      if (processed.unchanged) {
        finalResult.unchanged = true;
      }
      finalResult.drink = drink;
    }
    return finalResult;
  };

  return { replace, add, remove };
};
