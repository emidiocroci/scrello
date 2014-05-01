'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  
    beforeEach(module('scrello.services'));

    describe('notify', function() {    
        it('should set the notification to success', inject( function($rootScope, notify) {
            notify('success');
            expect($rootScope.notification.type).toBe('success');
        }));
        it('should set the notification message to the given value', inject( function($rootScope, notify) {
            notify('success', false, 'test');
            expect($rootScope.notification.message).toBe('test');
        }));
        it('should set the notification message to \'\' if the message is not defined', inject( function($rootScope, notify) {
            notify('danger');
            expect($rootScope.notification.message).toBe('');
        }));
        it('should clear the notification after 3 seconds if not persistent', inject( function($rootScope, notify, $timeout) {
            notify('danger');
            expect($rootScope.notification.message).toBe('');
            $timeout.flush();            
            expect($rootScope.notification).toBe(null);            
        }));
        it('should not clear the notification after 3 seconds if persistent', inject( function($rootScope, notify, $timeout) {
            notify('danger', true);
            expect($rootScope.notification.message).toBe('');
            try { 
                $timeout.flush();            
            }
            catch (err) {
                expect($rootScope.notification.type).toBe('danger');                
            }            
        }));
    });

    describe('organizations', function() {
        var backend;
        var orgs;

        beforeEach(inject(function ($injector) {
            backend = $injector.get('$httpBackend');
        }));        

        afterEach(function () {
            backend.verifyNoOutstandingExpectation();
            backend.verifyNoOutstandingRequest(); 
        });

        it('should try to retrieve the organizations using trello api', inject(function ($injector) {
            backend.expectGET('/trello/members/me/organizations').respond(200, []);
            orgs = $injector.get('organizations');
            backend.flush();            
        }));

        it('should return an error if no organizations were found', inject(function ($injector) {
            var res;
            backend.expectGET('/trello/members/me/organizations').respond(200, []);
            orgs = $injector.get('organizations');
            orgs.then(function (data) {}, function (data) { res = data; })
            backend.flush();
            expect(res).toBeDefined();
        }));
    });

});
