var app = require('./server');

const port = 3001;

app.listen(port, function() {
	console.log(`Server is running on port ${port}`);
});