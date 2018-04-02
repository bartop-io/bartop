const router = require('express').Router();
const { userRouter } = require('./user');
const { drinkRouter } = require('./drink');
const { catalogRouter } = require('./catalog');

router.use('/users', userRouter);
router.use('/drinks', drinkRouter);
router.use('/catalogs', catalogRouter);

module.exports = router;
