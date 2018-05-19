const processDbResult = require('../../utils/processDbResult');

module.exports = r => {
  const add = async body => {
    const { userId, drinkIds } = body;
    const drinks = await r.table('drinks').getAll(...drinkIds);
    const finalResult = {};
    if (!drinks.length) {
      finalResult.errors = [];
      finalResult.errors.push({
        message: 'None of the given drinks are valid.'
      });
    } else {
      const dbOpResult = await r
        .table('users')
        .get(userId)
        .update({
          // setUnion returns an array of distinct values
          // this prevents duplication
          catalog: r.row('catalog').setUnion(drinkIds)
        });
      processDbResult(dbOpResult, userId);
      finalResult.drinks = drinks;
    }
    return finalResult;
  };

  const remove = async body => {
    const { userId, drinkIds } = body;
    const drinks = await r.table('drinks').getAll(...drinkIds);
    const finalResult = {};
    if (!drinks.length) {
      finalResult.errors = [];
      finalResult.errors.push({
        message: 'None of the given drinks are valid.'
      });
    } else {
      const dbOpResult = await r
        .table('users')
        .get(userId)
        .update({
          catalog: r.row('catalog').difference(drinkIds)
        });
      processDbResult(dbOpResult, userId);
      finalResult.drinks = drinks;
    }
    return finalResult;
  };

  return { add, remove };
};
