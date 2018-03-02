const router = require('express').Router();
const { drinksRouter } = require('./drink');
const { usersRouter } = require('./user');

router.use('/drinks', drinksRouter);
router.use('/users', usersRouter);

module.exports = router;
