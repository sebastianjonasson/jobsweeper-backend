var http = require('http');
var request = require('request');

module.exports = {
	get: httpGet,
	post: httpPost
}

function httpGet(options) {
	console.log(options);
	
	return new Promise(function(resolve, reject) { 
		var chunks = "";

		var req = http.request(options, (res) => {
		
			res.setEncoding('utf8');
		
			res.on('data', (chunk) => {
				chunks += chunk
			});
		
			res.on('end', () => {
				var json = JSON.parse(chunks);
				resolve(json);
			})
	
		});

		req.on('error', (e) => {
	 		console.log(`problem with request: ${e.message}`);
			reject()
		});

		req.end();
	
	});
}



function httpPost (url, body) {

		return new Promise(function(resolve, reject) {
		
			request.post(url, {json:body}, function(err, res, body) {
				
				if(err) {
					console.log(err);
					return reject(err);
				}
				resolve(body);
			})

		})

}

