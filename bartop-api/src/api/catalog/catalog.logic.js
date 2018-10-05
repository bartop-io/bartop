const processDbResult = require('../../utils/processDbResult');
const validateDrinkIds = require('../../utils/validators/drinks');

module.exports = r => {
  const add = async body => {
    // initialize variables
    const { userId, drinkIds } = body;
    const finalResult = {};
    const errors = [];

    // validate drinks
    const { drinksError, validDrinks, drinkObjects } = validateDrinkIds(
      drinkIds
    );

    if (drinksError) {
      errors.push(drinksError);
    }

    // update catalog if there are drinks to be added
    if (validDrinks.length) {
      const dbOpResult = await r
        .table('users')
        .get(userId)
        .update({
          // setUnion returns an array of distinct values
          // this prevents duplication
          catalog: r.row('catalog').setUnion(validDrinks)
        });

      // process results
      const processedResult = processDbResult(dbOpResult, userId);

      // these errors mean no data could be returned
      if (processedResult.error) {
        errors.push(processedResult.error);
      } else {
        finalResult.drinks = drinkObjects;
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
    const { userId, drinkIds } = body;
    const finalResult = {};
    const errors = [];

    // validate drinks
    const { drinksError, validDrinks, drinkObjects } = validateDrinkIds(
      drinkIds
    );

    if (drinksError) {
      errors.push(drinksError);
    }

    // update catalog if there are drinks to be added
    if (validDrinks.length) {
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
        finalResult.drinks = drinkObjects;
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
