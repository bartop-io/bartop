const router = require('express').Router();
const controller = require('./user.controller');

// post users/
router.route('/').post(controller.create);

// get users/
router.route('/').get(controller.list);

module.exports = router;
