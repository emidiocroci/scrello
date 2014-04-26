'use strict';
var Sprint = require('../model').Sprint;
var winston = require('winston');

exports.save = function(req, res) {
    winston.debug('Saving the received sprint', { sprint: req.body.sprint} );
    Sprint.create(req.body.sprint, function (err, data) {
        if(!err) {
        	winston.info('Sprint correctly saved');
            res.send(200, { id: data._id });
        }
        else {
        	winston.error('Sprint not saved.', { error: err});
            res.send(500, err.message);
        }
    });
};
