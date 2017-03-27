var http = require('./http.js')
var getJobDetails = require('./af-jobs.js')
var users = require('./users.js')
var env = require('../environment').getEnvironment(); 

function getOverview(employerid) {
	var url =  env.engineIP + "/overall_stats_employer?employerId="+employerid; 
	return http.get(url)
}

function getJobs(employerid) {
  var url = env.engineIP + "/job_stats?employerId="+employerid;

	return http
		.get(url)
		.then(function(jobs){
			var tasks = jobs.map(function(job) {
				var id = job.jobId;

				return getJobDetails([id])
					.then(function(_job) {
						var _job = _job[0];
						_job.platsannons.likes = job.likes;
						_job.platsannons.dislikes = job.dislikes;
						_job.jobseekers = [];
						return _job;
					})
			})

			return Promise.all(tasks);
		})
}

function getApplicants(employerid) {
	var url =  env.engineIP + '/job_applicants?employerId='+employerid

	return http
		.get(url)
		.then(function(applicants) {

			return applicants.map(function(a) {
				a.users = a.userIds.map(function(id) {
					return users.getDetails(id)
				})
				return a;
			});
		});
}

function getStats(employerid) {
	var tasks = [
	  getOverview(employerid),
		getJobs(employerid),
		getApplicants(employerid)
	]

	return Promise
		.all(tasks)
		.then(function (data) {
			var overview = data[0];
			var jobs = data[1];
			var applicants = data[2];
			
			jobs.forEach(function(job) {
			  var annonsid = job.platsannons.annons.annonsid;
				applicants.forEach(function(a) {
					if(a.jobId == annonsid) {
						job.jobseekers = a.users;
					}
				})
			})
			
			return {
				overview: overview,
				jobs: jobs,
			}
		})
}

exports.getStats = getStats;
