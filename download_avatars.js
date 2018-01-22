var request = require('request');
var token = require('./secrets');
var data = "";

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
	  	var data = JSON.parse(body);
	  	cb(err, data);
	  });
}

getRepoContributors("jquery", "jquery", function(err,result){
	console.log("Errors: ", err);
    // var b = '';
	for (var i = 0; i < result.length; i++) {
		console.log(result[i].avatar_url);
	}
});