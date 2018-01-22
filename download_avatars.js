var request = require('request');
var token = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloaders!');

function getRepoContributors(repoOwner, repoName, cb){
	var options = {  
	  url: `https://api.github.com/repost/${repoOwner}/${repoName}/contributors`;
	  headers: {
	  	'User-Agent': 'request'
	  Authorization: token
	  }
	}

	  request(options, function(err, res, body){
	  	cb(err, body);
	  });
}

getRepoContributors("jquery", "jquery", function(err,result){
	console.log("Errors: ", err);
	console.log("Result: ", result);
});