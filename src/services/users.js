var http = require('./http.js')

var users = [
	{
		id: 1,
		name: 'Victor Axelsson',
		image: 'http://digventures.com/flag-fen/wp-content/uploads/placeholder-man-grid-240x268.png',
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

module.exports = {
	get: get
}
