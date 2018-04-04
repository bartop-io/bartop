const router = require('express').Router();
const controller = require('./catalog.controller');

// post catalogs/
router.route('/').post(controller.create);

module.exports = router;
