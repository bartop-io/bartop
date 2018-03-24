const router = require('express').Router();
const db = require('../../db/store');
const controller = require('./user.controller')(db);

// post users/
router.route('/').post(controller.create);

// get users/
router.route('/').get(controller.list);

module.exports = router;
