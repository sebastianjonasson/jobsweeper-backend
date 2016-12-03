var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json())

/*
 *	GET JOBS
 */
var jobs  = require('./services/jobs.js')
var matchEngine = require('./services/match-engine.js')

app.get('/jobs', function(req, res) {
	var id = req.headers["js-userid"]; 
	
	jobs(id)
		.then(function(jobs) {
			res.json(jobs)
		})
		.catch(function () {
			res.json({"general":"error"})
		}) 
});


/*
 *	SET TAGS DELTA
 */
app.post('/jobs', function(req, res) {
	var id = req.headers["js-userid"]; 
	var tags = req.body.tags;
	
	matchEngine
		.setTagsDelta(id, tags)
		.then(function() {
			res.status(200);
			res.end();
		})
		.then(function(err) {
			console.log(err);
			res.status(500);
			res.end();
		})

})

app.listen(8888);

console.log("Running at localhost:8888");
