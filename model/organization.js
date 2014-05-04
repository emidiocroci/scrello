var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orgSchema = new Schema(
    {
        org_id: {
            type: String,
            required: true
        },    
        sprints: {
            type: Array,
            required: true        
        }
    });

var Org = module.exports = mongoose.model('Org', orgSchema);