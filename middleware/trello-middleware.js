"use strict";

var Trello = require('node-trello');

module.exports = function (req, res, next) {
	if (!req.user)
		next('You are not authenticated!');
	else if (!process.env.TRELLO_KEY)
		next('Your trello key is not defined!');
	else {
		req.trello = new Trello(process.env.TRELLO_KEY, req.user.token);
		var reqUrl = '/1/' + req.params;
		console.log('sending request ' + reqUrl);
		req.trello[req.method.toLowerCase()](reqUrl, req.query, function(err, data) {
			if (err) res.send(500, err.message);
			console.log('Data received from trello!');
			res.json(data);
		});
	}
}
