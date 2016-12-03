var express = require('express');
var app = express();

var bodyParser = require('body-parser')



var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json())

/*
 *	GET JOBS
 */
var jobs  = require('./services/jobs.js')
var matchEngine = require('./services/match-engine.js')
var users = require('./services/users.js')

app.get('/jobs', function(req, res) {
	var id = req.headers["js-userid"]; 
	
	//return res.json(require('./testdata.js'))

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
	var employerid = req.body.jobid;
	var tags = req.body.tags;
	var liked = (tags[0].delta === 1)
	
	matchEngine
		.setTagsDelta(id, tags)
		.then(function() {
			return matchEngine.setJobSwipe(id, employerid, liked)
		})
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


app.post('/update-tags', function(req, res) {
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

/*
 *	GET USER
 */
app.get('/user', function (req, res) {
	var userid = req.headers["js-userid"];
	
	
	users
		.get(userids)
		.then(function (user) {
			res.json(user)
		})
		.catch(function (err) {
			res.status(500); console.log(err);
			res.end();
		})
});


/*
 *	GET EMPLOYER STATS
 */
app.get('/employer-stats/:id', function(req, res) {
	var id = req.params.id;

	var data = {
		overview: {
			likes: 37,
			dislikes: 13
		},
		jobs: [
			{
				id: '12345',
				title: 'This is a job listing',
				like: 1,
				dislikes: 3
			}
		],
		jobseekers: [
			{
				name: 'John Doe',
				location: 'malmö'
			}
		] 
	}

	res.json(data);
})

app.listen(8888);

console.log("Running at localhost:8888");
