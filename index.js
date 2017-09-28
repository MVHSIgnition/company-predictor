const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const htmlparser = require('htmlparser2');
const headlines = require('./headlines');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

/*
var parser = new htmlparser.Parser({
	onopentag: function(name, attribs) {
		if (name === 'h3') {
			//h3 should be the tag that all the search results have
			console.log(attribs.class);
		}
	},
	ontext: function(text) {
		//console.log(text);
	},
	onclosetag: function(tagname) {
		
	}
});
*/

io.on('connection', function(socket) {
	console.log('user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on('search', function(query) {
		console.log(socket.id);
		headlines.getHeadlines(query).then(function(results) {
			console.log('got results');
			results.each(function(i, result) {
				io.sockets.connected[socket.id].emit('results', result);
			});
		}, function(err) {
			console.log('error', error);
		});
	});
});

http.listen(1266, function() {
	console.log('server listening on *:1266');
});