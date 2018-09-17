const processDbResult = require('../../utils/processDbResult');
// const logger = require('../../utils/logger');

module.exports = r => {
  const create = async body => {
    // validate drinks
    // ^ should make modules for this
    const { userId } = body;
    const menuId = await r.uuid();
    const newMenu = {
      id: menuId,
      name: body.name,
      description: body.description, // need to test without a description
      drinks: body.drinkIds // could change with validate
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

    const finalPayload = {};
    const processedResult = processDbResult(dbOpResult, userId);
    if (processedResult.error) {
      finalPayload.errors = [processedResult.error];
    } else {
      finalPayload.menu = newMenu;
    }

    return finalPayload;
  };

  return { create };
};
