var matchEngine = require('./match-engine.js');
var afJobs = require('./af-jobs.js');

//use match engine to get annonsids and tags
function getJobIds (userid) {
	return matchEngine.getJobs(userid, 5)
} 

//use af-jobs to fetch from af
function work(userid) {
	
	return matchEngine
		.getJobs(userid, 5)
		.then(function(ids) {
			var _ids = ids.map(function(obj) {
				return obj.id;
			})
		
			return afJobs(_ids)
				.then(function(jobposts) {

					var output = jobposts.map(function (post) {
						var id = ids.find(function (asd) {
							return asd.id == post.platsannons.annons.annonsid;
						})

						post.platsannons.tags = id.tags.map(function(tag){
							return tag.name;
						});
						return post;
					})
					return output;
			})
		})
}

module.exports = work;
