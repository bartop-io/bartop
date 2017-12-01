const router = require('express').Router();
const drinksRouter = require('./drink/drinkRouter');

// drink router
router.use('/drinks', drinksRouter);

module.exports = router;
