const request = require('request');
const cheerio = require('cheerio');

exports.getHeadlines = function(query) {
	return new Promise( function(resolve, reject) {
		request('https://www.google.com/search?q=' + query + '&tbm=nws&tbs=qdr:w', function (error, response, body) {
			if (!error) {
				var $ = cheerio.load(body);
				var headlines = $('h3').map(function (i, elem) {
					//this refers to elem
					console.log('headline' + i + ': ', $(this).text());
					return $(this).text();
				});
				console.log('end');
				resolve(headlines);
			} else {
				console.log(error);
				reject(error);
			}
		});
	});
};