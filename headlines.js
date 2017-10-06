const request = require('request');
const cheerio = require('cheerio');
const url = require('url');
const extractor = require('unfluff');

exports.getHeadlines = function(query) {
	return new Promise( function(resolve, reject) {
		request('https://www.google.com/search?q=' + query + '&tbm=nws&tbs=qdr:w', function (error, response, body) {
			if (!error) {
				var $ = cheerio.load(body);
				var headlines = $('h3').map(function (i, elem) {
					//this refers to elem
					console.log('headline' + i + ': ', $(this).text());
					var address = url.parse($(this).find('a').attr('href'), true).query.q;
					request(address, function(error, response, body) {
						var $ = cheerio.load(body);
						var data = extractor(body);
						console.log(address);
						//if webpage doesn't include membership message:
						if (data.text.indexOf('We hope you have enjoyed your complimentary access for the month') === -1) {
							console.log(data.text);
						}
						console.log("----------------------------------------------------------------------------------------------------");
						console.log("----------------------------------------------------------------------------------------------------");
						console.log("----------------------------------------------------------------------------------------------------");
					});
					
					
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