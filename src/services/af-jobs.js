var http = require('./http.js')

module.exports = function (jobids) {
	var requests = jobids.map(function(id) {
		var options = buildOptions(id);
		return http.get(options);
	})

	return Promise.all(requests);
}

function buildOptions(jobid) {

	return {
		hostname: 'api.arbetsformedlingen.se',
		path: '/af/v0/platsannonser/'+jobid,
		method: 'GET',
		port: 80,
		headers: {
			"Content-type":"application/json",
			"Accept": "application/json",
			"Accept-Language": "sv"
		} 
	}
}

