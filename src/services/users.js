var http = require('./http.js')
var getJobDetails = require('./af-jobs.js');
var env = require('../environment').getEnvironment(); 

var users = [
	{
		id: 1,
		name: 'Victor Axelsson',
		image: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/13346836_1005993406134268_2346887312726116763_n.jpg?oh=166daa935f4f2b10aeea191bf43d99eb&oe=58C70377',
	},
	{
		id: 2,
		name: 'Felex P',
		image: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/542799_450402538360027_38379532_n.jpg?oh=68c28f1a2e270f526b1c9432a836fa04&oe=58C1BBE4',
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
