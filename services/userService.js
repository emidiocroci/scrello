var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.authenticate = function (username, done) {
    if (username)
        User.findOne({ 'username': username }, function (err, usr) {
            if (err)
                done(err);    
            else if (usr)
                done(null, usr);
            else 
                User.create({ username: username}, function (err, res) {
                    done(err, res);
                });
        });
    else if (username === undefined)
        done(new Error('Cannot authenticate an user with an undefined username!'));
    else
        done(new Error('Cannot authenticate an user with an empty or null username!'));
};