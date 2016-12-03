var http = require('./http.js')

function fetchJobs(userid, length) {
	length = length || 5;

	var options = {
		hostname: '192.168.8.103',
		path:'/get_job_recs?userId=1&recNumber='+length,
		method: 'GET',
		port: 8080,
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
	var url = 'http://192.168.8.103:8080/update_user_recommendations';
	
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
	setTagsDelta: updateTags
}
