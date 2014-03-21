var model = require('../model');

module.exports = function() {
    var _passport = require('passport'),
        TrelloStrategy = require('passport-trello').Strategy;    

    this.callBack = function(req, token, tokenSecret, profile, done) {
        console.log(profile);
        model.User.authenticate(profile._json.username, function (err, usr) {            
            if (err) throw err;
            usr.idOrganizations = profile._json.idOrganizations;
            usr.save(function (err) {
                if (err) done(err, null);
                else done(null, usr);
            });
        });
    };

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
        this.callBack));

    _passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    _passport.deserializeUser(function(id, done) {
        model.User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    this.passport = _passport;
}