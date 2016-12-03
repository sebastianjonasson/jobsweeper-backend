var http = require('./http.js')

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
	var url = 'http://192.168.8.103:8080/get_tags_for_user?userId='+id

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

function getSwiptedJobs(id) {
	var url = "http://192.168.8.103:8080/"

	return http.get(url);
}

function getDetails(id) {
	return users.find(function(u) {
		return u.id == id
	});
}

module.exports = {
	get: get,
	getDetails: getDetails
}
