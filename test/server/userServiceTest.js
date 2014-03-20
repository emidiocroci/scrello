var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);
var model = require('../../model'),
    User = mongoose.model('User'),
    userService = require('../../services/userService'),
    chai = require('chai');
chai.should();

describe('Authentication of trello user', function (){
    
    beforeEach(function () {
        mockgoose.reset('User');
    });

    it('returns the user if already exists', function (done) {
        User.create({
            username: 'username'
        },
        function (err, user) {
            userService.authenticate(user.username, function (err, authUser) {
                authUser.username.should.equal(user.username);
                done();
            });
        });
    });

    it('creates the user if it does not exist and return it', function (done) {
        userService.authenticate('username', function (err, authUser) {
            authUser.username.should.equal('username');
            done();
        });
    });

    it('throws an error if the username is undefined', function (done) {
        userService.authenticate(undefined, function (err, authUser) {
            err.message.should.equal('Cannot authenticate an user with an undefined username!');
            done();
        });
    });

    it('throws an error if the username is empty or null', function (done) {
        userService.authenticate(null, function (err, authUser) {
            err.message.should.equal('Cannot authenticate an user with an empty or null username!');
            done();
        });
    });    
});