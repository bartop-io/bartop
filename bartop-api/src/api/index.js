const router = require('express').Router();
const drinksRouter = require('./drink/drinkRouter');
const usersRouter = require('./user/userRouter');

router.use('/drinks', drinksRouter);
router.use('/users', usersRouter);

module.exports = router;
