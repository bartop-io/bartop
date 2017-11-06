const router = require('express').Router();

router.get('/hello', function(req, res) {
  res.send('Hello, BarTop user.');
});

module.exports = router;
