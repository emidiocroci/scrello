var trelloMiddleware = require('../../middleware/trello-middleware');
	chai = require('chai');

chai.should();

describe('trello middleware', function () {
	it('should return error if the user is not authenticated', function (done) {
		trelloMiddleware({}, {}, function (err) {
			err.should.equal('You are not authenticated!');
			done();
		});
	}); 

	it('should return error if the trello key is not defined', function (done) {
		process.env.TRELLO_KEY = '';
		trelloMiddleware({
			user: {
				token: 'token'
			}},
			{},
			function(err) {
				err.should.equal('Your trello key is not defined!');
				done();
			}
		);
	});
});
