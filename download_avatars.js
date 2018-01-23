var request = require('request');
var token = require('./secrets');
var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloaders!');


	function getRepoContributors(repoOwner, repoName, cb){

		if (!process.argv[2] || !process.argv[3]){
			console.log('Input error: missing repository owner and/or repository name');
		}

		var options = {  
		  url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
		  headers: {
		  	'User-Agent': 'request'
		  },
		  Authorization: 'token' + token.GITHUB_TOKEN
		};

		  request(options, function(err, res, body){
		  	cb(err, JSON.parse(body));
		  });
	}

	getRepoContributors(process.argv[2], process.argv[3], function(err,result){
	      console.log("Errors: ", err);
		  
		  for (var i = 0; i < result.length; i++) {
			var xAvatar = result[i].avatar_url;
			var path = "./avatars/" + result[i].login + result[i].id + ".png";
			// console.log(avatar);
    
           downloadImageByURL(xAvatar, path);
		}
		
	});

	function downloadImageByURL(url, filePath){
		request.get(url)
	          .on('error', function (err) {
	            throw err;
	          })

	          .on('end', function() {
	          console.log('Download complete.');
	          })
		      .pipe(fs.createWriteStream(filePath));
	};









