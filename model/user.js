var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        username: String,
        idOrganizations: Array
    });

mongoose.model('User', userSchema);