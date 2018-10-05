const processDbResult = require('../../utils/processDbResult');
const validateDrinkIds = require('../../utils/validators/drinks');

module.exports = r => {
  const create = async body => {
    const finalPayload = {};
    const errors = [];
    const { userId, drinkIds } = body;

    // validate drinks
    const { drinksError, validDrinks } = validateDrinkIds(drinkIds);

    if (drinksError) {
      errors.push(drinksError);
    }

    if (validDrinks.length) {
      const menuId = await r.uuid();
      const newMenu = {
        id: menuId,
        name: body.name,
        description: body.description, // need to test without a description
        drinks: validDrinks
      };

      const dbOpResult = await r
        .table('users')
        .get(userId)
        .update({
          // OLD: setUnion returns an array of distinct values
          // this prevents duplication
          // NEW: we need to be able to add a menu to an existing array without affecting the others
          // the union might work, the difference is that they are objects so how would rethink
          // handle comparisons for duplicates?
          menus: r.row('menus').setUnion(newMenu)
        });

      const processedResult = processDbResult(dbOpResult, userId);
      if (processedResult.error) {
        errors.push(processedResult.error);
      } else {
        finalPayload.menu = newMenu;
      }
    }

    if (errors.length) {
      finalPayload.errors = errors;
    }

    return finalPayload;
  };

  return { create };
};
