const processDbResult = require('../../utils/processDbResult');

module.exports = r => {
  const add = async body => {
    const { userId, drinkIds } = body;
    const drinks = await r.table('drinks').getAll(...drinkIds);
    const finalResult = {};
    if (drinks.length !== drinkIds.length) {
      finalResult.errors = [];
      const invalidDrinkIds = listInvalidDrinks(drinkIds, drinks);
      finalResult.errors.push({
        message: `The following drink ids are invalid: ${invalidDrinkIds.join(
          ', '
        )}`
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
    if (drinks.length !== drinkIds.length) {
      finalResult.errors = [];
      const invalidDrinkIds = listInvalidDrinks(drinkIds, drinks);
      finalResult.errors.push({
        message: `The following drink ids are invalid: ${invalidDrinkIds.join(
          ', '
        )}`
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

function listInvalidDrinks(givenDrinkIds, actualDrinks) {
  const actualDrinkIds = actualDrinks.map(drink => drink.id);
  return givenDrinkIds.filter(id => !actualDrinkIds.includes(id));
}
