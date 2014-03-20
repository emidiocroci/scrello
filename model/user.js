var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        username: String,
        idOrganizations: Array
    });

userSchema.statics.authenticate = function (username, done) {
    var that = this;
    if (username)
        this.findOne({ 'username': username }, function (err, usr) {
            if (err)
                done(err);    
            else if (usr)
                done(null, usr);
            else {
                var newUsr = new that();
                newUsr.username = username;
                newUsr.save(function (err, res) {
                    done(err, res);
                });
            }
        });
    else if (username === undefined)
        done(new Error('Cannot authenticate an user with an undefined username!'));
    else
        done(new Error('Cannot authenticate an user with an empty or null username!'));
};

var User = mongoose.model('User', userSchema);