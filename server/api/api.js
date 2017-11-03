const router = require('express').Router();

router.get('/hello', function(req, res) {
	res.json('Hello, BarTop user.');
});

module.exports = router;