const processDbResult = require('../../utils/processDbResult');
const logger = require('../../utils/logger');

module.exports = r => {
  const add = async body => {
    // initialize variables
    const { userId } = body;
    let { drinkIds } = body;
    const finalResult = {};
    const errors = [];

    // validate drinks
    const drinks = await r.table('drinks').getAll(...drinkIds);
    if (drinks.length !== drinkIds.length) {
      const invalidDrinkIds = listInvalidDrinks(drinkIds, drinks);
      errors.push({
        message: 'Drinks Not Found',
        id: invalidDrinkIds
      });
      logger.error(`Drink objects not found: ${invalidDrinkIds}`);
      drinkIds = drinkIds.filter(id => !invalidDrinkIds.includes(id));
    }

    // update catalog if there are drinks to be added
    if (drinkIds.length) {
      const dbOpResult = await r
        .table('users')
        .get(userId)
        .update({
          // setUnion returns an array of distinct values
          // this prevents duplication
          catalog: r.row('catalog').setUnion(drinkIds)
        });

      // process results
      const processedResult = processDbResult(dbOpResult, userId);

      // these errors mean no data could be returned
      if (processedResult.error) {
        errors.push(processedResult.error);
      } else {
        finalResult.drinks = drinks;
      }
    }

    // attach errors array
    if (errors.length) {
      finalResult.errors = errors;
    }
    return finalResult;
  };

  const remove = async body => {
    // initialize variables
    const { userId } = body;
    let { drinkIds } = body;
    const finalResult = {};
    const errors = [];

    // validate drinks
    const drinks = await r.table('drinks').getAll(...drinkIds);
    if (drinks.length !== drinkIds.length) {
      const invalidDrinkIds = listInvalidDrinks(drinkIds, drinks);
      errors.push({
        message: 'Drinks Not Found',
        id: invalidDrinkIds
      });
      logger.error(`Drink objects not found: ${invalidDrinkIds}`);
      drinkIds = drinkIds.filter(id => !invalidDrinkIds.includes(id));
    }

    // update catalog if there are drinks to be added
    if (drinkIds.length) {
      const dbOpResult = await r
        .table('users')
        .get(userId)
        .update({
          catalog: r.row('catalog').difference(drinkIds)
        });

      // process results
      const processedResult = processDbResult(dbOpResult, userId);

      // these errors mean no data could be returned
      if (processedResult.error) {
        errors.push(processedResult.error);
      } else {
        finalResult.drinks = drinks;
      }
    }

    // attach errors array
    if (errors.length) {
      finalResult.errors = errors;
    }
    return finalResult;
  };

  return { add, remove };
};

function listInvalidDrinks(givenDrinkIds, actualDrinks) {
  const actualDrinkIds = actualDrinks.map(drink => drink.id);
  return givenDrinkIds.filter(id => !actualDrinkIds.includes(id));
}
