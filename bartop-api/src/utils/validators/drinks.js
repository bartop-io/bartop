const logger = require('../logger');

// validate that drink ids passed to the api are valid
// if any ids are invalid,
// return object with preformatted error object and array of valid ids
// otherwise,
// indicate that there is no error and return all the drink ids
// return all valid drink objects regardless

module.exports = async (r, ids) => {
  const result = { drinksError: {}, validDrinks: [] };
  const drinks = await r.table('drinks').getAll(...ids);
  result.drinkObjects = drinks;
  if (drinks.length !== ids.length) {
    const invalidDrinkIds = listInvalidDrinks(ids, drinks);
    result.drinksError.message = 'Drinks Not Found';
    result.drinksError.id = invalidDrinkIds;
    // log invalid ids
    logger.error(`Drink objects not found: ${invalidDrinkIds}`);
    result.validDrinks = ids.filter(id => !invalidDrinkIds.includes(id));
  } else {
    result.drinksError = false;
    result.validDrinks = ids;
  }

  return result;
};

function listInvalidDrinks(givenDrinkIds, actualDrinks) {
  const actualDrinkIds = actualDrinks.map(drink => drink.id);
  return givenDrinkIds.filter(id => !actualDrinkIds.includes(id));
}
