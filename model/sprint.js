var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sprintSchema = new Schema(
    {
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        org: {
            type: String,
            required: true
        }
    });

var Sprint = module.exports = mongoose.model('Sprint', sprintSchema);

sprintSchema.pre('save', function (next) {
    var sprint = this;
    if (sprint.startDate.getTime() > sprint.endDate.getTime())
        next(new Error('startDate cannot be greater than endDate'));
    else
        Sprint
            .where('startDate').lt(sprint.startDate)
            .where('endDate').gt(sprint.startDate)
            .exec(function(err, items) {
                if (items && items.length == 0) {
                    Sprint
                        .where('startDate').gt(sprint.startDate)
                        .where('startDate').lt(sprint.endDate)
                        .exec(function (err, docs) {
                            if (docs && docs.length > 0)
                                next(new Error('There is already a sprint that will begin before the end of this one.'));
                                else
                                next();
                            });
                }
                else
                    next(new Error('There is already an active sprint!'), null);
        });
});
