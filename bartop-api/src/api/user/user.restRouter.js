const router = require('express').Router();
const controller = require('./user.controller');

// post users/
router.route('/').post(controller.create);

// get users/
router.route('/').get(controller.list);

// get users/:id
router.route('/:id').get(controller.get);

module.exports = router;
