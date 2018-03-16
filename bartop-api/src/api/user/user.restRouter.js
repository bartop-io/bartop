const router = require('express').Router();
const db = require('../../db/store');
const controller = require('./user.controller')(db);

// post user/:id
router.route('/:id').post(controller.create);

module.exports = router;
