'use strict';
var Sprint = require('../model').Sprint;

exports.save = function(req, res) {        
    Sprint.create(req.body.sprint, function (err, data) {        
        console.log(req.body.sprint);
        if(!err)
            res.send(200, { id: data._id });
        else
            res.send(500, err.message);
    });
};