var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function() {
    var _passport = require('passport'),
        TrelloStrategy = require('passport-trello').Strategy;    

    _passport.use('trello', 
        new TrelloStrategy({
            consumerKey: process.env.TRELLO_KEY,
            consumerSecret: process.env.TRELLO_SECRET,
            callbackURL: 'http://localhost:3000/cb',
            passReqToCallback: true,
            trelloParams: {
                scope: "read,write",
                name: "Scrello",
                expiration: "never"
            }}, 
        function(req, token, tokenSecret, profile, done) {
            User.authenticate(profile.username, profile.idOrganizations, done);
        }));

    this.passport = _passport;
}