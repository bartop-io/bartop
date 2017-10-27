const express = require('express');
const morgan = require('morgan');
const app = express();

// set up a logger
// using dev mode for now but this can be easily changed later on
app.use(morgan('dev'));

app.get('/api/v1/hello', function(req, res) {
	res.send('Hello, BarTop user.');
});

const port = 3001;

app.listen(port, function() {
	console.log(`Server is running on port ${port}`);
});