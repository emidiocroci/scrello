var mongoose = require('mongoose'),
	mockgoose = require('mockgoose');
mockgoose(mongoose);

var TrelloAuth = require('../../authStrategies/trelloAuth'),
	trelloAuth = new TrelloAuth();

var User = mongoose.model('User');
var chai = require('chai');
chai.should();

describe("Trello authentication strategy", function () {
	it("should update the user with his organizations after the login", function (done) {
		User.create({usename: 'username'}, function (err, usr) {
			trelloAuth.callBack(
				null, 
				null, 
				null, 
				{
					_json: {
						username: 'username', 
						idOrganizations: ['1','2']
					}				
				}, 
				function (err, res) {
					res.idOrganizations.length.should.equal(2);
					res.idOrganizations[0].should.equal('1');
					res.idOrganizations[1].should.equal('2');
					done();
				});
		});
	});
});