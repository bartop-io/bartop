const router = require('express').Router();
const { userRouter } = require('./user');
const { drinkRouter } = require('./drink');

router.use('/users', userRouter);
router.use('/drinks', drinkRouter);

module.exports = router;
