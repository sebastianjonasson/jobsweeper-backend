var http = require('./http.js')

function getOverview(employerid) {
	var url = "http://192.168.8.103:8080/overall_stats_employer?employerId="+employerid;

	return http.get(url)
}

function getJobs(employerid) {
  var url = ""
}

function getStats(employerid) {
	var tasks = [
	  getOverview(employerid)	
	]

	Promise
		.all(tasks)
		.then(function () {
		
		});
} 
