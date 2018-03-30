const router = require('express').Router();
const restRouter = require('./restRouter');
const graphqlRouter = require('./graphqlRouter');

router.use('/v1', restRouter);
router.use('/graphql', graphqlRouter);

module.exports = router;
