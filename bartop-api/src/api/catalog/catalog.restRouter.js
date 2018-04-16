const router = require('express').Router();
const controller = require('./catalog.controller');

// put catalogs/
router.route('/').put(controller.replace);

module.exports = router;
