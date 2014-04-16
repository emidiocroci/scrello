var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sprintSchema = new Schema(
    {
        startDate: {
            type: Date,
            required: true   
        },
        length: {
            type: Number,
            required: true   
        }
    });

module.exports = mongoose.model('Sprint', sprintSchema);