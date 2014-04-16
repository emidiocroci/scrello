'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);
var model = require('../../model'),    
    chai = require('chai').should();
var request = require('supertest');

//var app = require('../../app');

describe('sprint route', function() {

    beforeEach(function () {
        mockgoose.reset('Sprint');
    });

    describe('save', function() {
        it('should return the id of the sprint once saved', function(done) {
            var sprint = {
                startDate: '2014/03/01',
                length: 14
            };
            done();
        });
    });
    
});