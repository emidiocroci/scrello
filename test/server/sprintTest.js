'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);
var model = require('../../model'),
    chai = require('chai'),
    should = chai.should(),
    expect = chai.expect;
var request = require('supertest');
var express = require('express');
var app = express();
var sprint = require('../../routes/sprint');
app.use(express.bodyParser());

describe('sprint route', function() {

    app.post('/sprints', sprint.save);

    describe('save', function() {

        beforeEach(function () {
            mockgoose.reset('Sprint');
        });

        it('should return the id of the sprint once saved', function(done) {
            var sprint = {
                startDate: '2014/03/01',
                endDate: '2014/03/10'
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

describe('sprint model', function() {
    var Sprint = model.Sprint;

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    }

    beforeEach(function () {
        mockgoose.reset('Sprint');
    });

    it('should not save a sprint with an endDate less than the startDate', function(done) {
        var endDate = new Date();
        var startDate = addDays(endDate, 1);
        Sprint.create({
            startDate: startDate,
            endDate: endDate
        }, function (err, data) {
            err.should.not.be.null;
            done();
        });

    });

    it('should not save the sprint if there is already one active sprint', function(done) {
        var start = new Date();

        Sprint.create({
            startDate: start,
            endDate: addDays(start, 2)
        }, function (err, data) {
            if (!err)
                Sprint.create({
                    startDate: new Date(),
                    endDate: addDays(new Date(), 2)
                }, function (err, data) {
                    err.should.not.be.null;
                    done();
                });
        });
    });

    it('should not save the sprint if a new one will begin before the end of the new one', function(done) {

        var start = new Date();
        var startSaved = addDays(start, 5);

        Sprint.create({
            startDate: startSaved,
            endDate: addDays(startSaved, 7)
        }, function (err, data) {
            if (!err)
                Sprint.create({
                    startDate: new Date(),
                    endDate: addDays(new Date(), 8)
                }, function (err, data) {
                    err.should.not.be.null;
                    done();
                });
        });
    });
});
