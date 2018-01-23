var request = require('request');
var token = require('./secrets');
var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloaders!');


	function getRepoContributors(repoOwner, repoName, cb){

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

	getRepoContributors("jquery", "jquery", function(err,result){
	      console.log("Errors: ", err);
		  
		  for (var i = 0; i < result.length; i++) {
			var xAvatar = result[i].avatar_url;
			var path = "./avatars/" + result[i].login + result[i].id;
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









