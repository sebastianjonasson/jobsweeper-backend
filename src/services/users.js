var http = require('./http.js')
var getJobDetails = require('./af-jobs.js');
var env = require('../environment').getEnvironment(); 

var users = [
	{
		id: 1,
		name: 'Victor Axelsson',
		image: 'https://pbs.twimg.com/profile_images/378800000822867536/3f5a00acf72df93528b6bb7cd0a4fd0c.jpeg',
	},
	{
		id: 2,
		name: 'Felex P',
		image: 'https://i.ytimg.com/vi/7p13vPNTQkQ/hqdefault.jpg',
	},
	
]

function get(id) {
	var url = env.engineIP + '/get_tags_for_user?userId='+id

	return http
		.get(url)
		.then(function(userTags) {
			
			var user = users.find(function (user) {
				return (user.id == id);
			});

			user.tags = userTags;

			return user;
		})

}

function getSwipedJobs(id, type) {

	var url = (type === 'negative')
		? env.engineIP + "/negative_swiped_jobs?userId="+id
		: env.engineIP + "/positive_swiped_jobs?userId="+id 
	
	console.log(url);

	return http
		.get(url)
		.then(function(jobids) {
			return getJobDetails(jobids);
		})
}

function getDetails(id) {
	return users.find(function(u) {
		return u.id == id
	});
}

module.exports = {
	get: get,
	getDetails: getDetails,
	getSwipedJobs: getSwipedJobs
}
