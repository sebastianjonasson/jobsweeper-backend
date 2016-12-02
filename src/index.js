var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.json({foo:"bar"})
});

app.listen(8888);

console.log("Running at localhost:8888");
