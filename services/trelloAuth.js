var userService = require('../services/userService');

module.exports = function() {
    var _passport = require('passport'),
        TrelloStrategy = require('passport-trello').Strategy;    

    _passport.use('trello', 
        new TrelloStrategy({
            consumerKey: '0bbdb312604fa9e930644d3a41aa6069',
            consumerSecret: 'f5c00e2ab0b70cab8f64430208b7c9118a95b2b997a1197fbab45f4d7f0b1284',
            callbackURL: 'http://localhost:3000/cb',
            passReqToCallback: true,
            trelloParams: {
                scope: "read,write",
                name: "Scrello",
                expiration: "never"
            }}, 
        function(req, token, tokenSecret, profile, done) {
            console.log(profile);
        }));

    this.passport = _passport;
}