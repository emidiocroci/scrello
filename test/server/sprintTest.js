'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);
var model = require('../../model'),    
    chai = require('chai').should();
var request = require('supertest');
var express = require('express');
var app = express();
var sprint = require('../../routes/sprint');
app.use(express.bodyParser());

describe('sprint route', function() {

    app.post('/sprints', sprint.save);

    beforeEach(function () {
        mockgoose.reset('Sprint');
    });

    describe('save', function() {
        it('should return the id of the sprint once saved', function(done) {            
            var sprint = {
                startDate: '2014/03/01',
                length: 14
            };
            request(app)
                .post('/sprints') 
                //.type('form')
                .send({ 
                    sprint: sprint
                })
                .expect(200, function (err, res) {
                    res.body.id.should.not.be.undefined;
                    done();   
                });
        });
    });
    
});