var http = require('./http.js')
var env = require('../environment').getEnvironment(); 


function fetchJobs(userid, length) {
	length = length || 5;

	var options = {
		hostname: env.engineIPOnly,
		path:'/get_job_recs?userId=1&recNumber='+length,
		method: 'GET',
		port: env.enginePort,
		headers: {}
	}

	return http
		.get(options)
		.then(function(response) {
			return response.recommendations;
		})
}

function updateTags (userid, tags) {
	var body = buildTagsBody(userid, tags);
	var url = env.engineIP + '/update_user_recommendations';
	return http.post(url, body);
}

function setJobSwipe(userid, jobid, swipe) {
	var url = env.engineIP + "/job_swipe";
	var body = {
		userId: userid,
		jobId: jobid,
		like: swipe
	};
	return http.post(url, body);
}

function buildTagsBody (id, tags) {
	return {
		userId: id,
		tagDelta: tags 
	}
}


module.exports = {
	getJobs: fetchJobs,
	setTagsDelta: updateTags,
	setJobSwipe: setJobSwipe
}
