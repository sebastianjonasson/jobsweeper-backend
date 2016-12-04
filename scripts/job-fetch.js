var request = require('request');

var url = "http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?yrkesid=2419&antalrader=10&sida=";
var joburl = "http://api.arbetsformedlingen.se/af/v0/platsannonser/";

var tags_raw = `
Health, People, Therapy, Mental health, Development, Mentoring, Welding, Attention to details, Cooperation, Hydraulics, Manufacturing, Offshore, Social Skills, Hardware, Cloud technologies, Java, OOP, C#, Programming, Network, Recruitment, Human Resource, Agile, Docker, Security, Linux, Testing, Web, HTML5, Javascript, Beauty, Make-up, math, analysis, communcation, scientific research, service, organization, social skills, education, sales, finance, CRM, health, fitness, people skills, personal assistance, MS Office, Forklift licens, prototyping, AngularJS, HTML, CSS, SQL, Android, ios, Windows Phone, Software Development, Scala, Python, testing, Analysis, debugging, Business Intelligence, POWER BI, REST, Objective-C, Swift, Customer Support, Strategy, Training, Sales, Account management, Management, Social skills, Inhouse sales, Administration, Accoubt Management, Media, Marketing, Customer Service`;

var tags = tags_raw.split(', ');

function query(page) {
	
	if(page === 15) return;

	url = url + page;
	request({
		url: url,
		headers: {
			'Content-type': 'application/json',
			'Accept': 'application/json',
			'Accept-Language':'sv'
		}
	}, function(err, res, body) {
		var jobs = JSON.parse(body);
		jobs = jobs.matchningslista.matchningdata;
		var tasks = jobs.map(function (job) {
			return new Promise(function(resolve, reject) {
			
				var id = job.annonsid;
				
				request({url: joburl+id, headers: {'Accept': 'application/json', 'Accept-Language':'sv'}}, function(err, res, body) {
					if(err) {
						return resolve(false);
					} 
					
					var thejob = JSON.parse(body);
					var text = thejob.platsannons.annons.annonstext;
					var _tags = findTags(text, tags);
				
					if(_tags.length === 0) {
						return resolve(false);
					}
					
					resolve({
						id: id,
						title: job.annonsrubrik,
						tags: _tags
					})
					
				})
			})
		})

		Promise
			.all(tasks)
			.then(function(jobs) {
				jobs = jobs.filter(function(job){
					return (job !== false)
				});

				sendToDB(jobs)
					.then(function() {
						console.log("DONE");
						console.log(page);
						page = page + 1;
						query(page);
					});
			})

	})
}

function findTags(text, tags) {
	var _tags = [];

	tags.forEach(function(tag) {
		
		if(text.toLowerCase().indexOf(tag.toLowerCase()) > -1) {
			_tags.push(tag);
		}

	});

	return _tags;
}

function sendToDB(input) {
	var url = "http://192.168.8.103:8080/insert_new_jobs";
	
	return new Promise(function(resolve, reject) {
	
		request({
			url: url,
			headers: {
				'Content-type':'application/json',
				//'Content-length':Buffer.byteLength(input)
			},
			method:'POST',
			body: JSON.stringify(input)
		}, function(err, asd, body) {
			resolve();
		})
	})
}


query(13);
