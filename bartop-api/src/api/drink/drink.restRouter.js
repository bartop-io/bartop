const router = require('express').Router();
const controller = require('./drink.controller');

// get drinks/
router.route('/').get(controller.list);

module.exports = router;
