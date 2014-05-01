'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
    var sprint = {
        start: '12/10/2014',
        length: 2
    };
    var backend;
    var scope;
    var controller,
        expectedOrgs = [
            {
                id: 'id1', 
                name: 'name1'
            },
            {
                id: 'id2', 
                name: 'name2'
            }];

    beforeEach(module('scrello.controllers'));

    beforeEach(inject(function ($injector, $controller) {
        backend = $injector.get('$httpBackend');
        scope = $injector.get('$rootScope');
        backend.expectGET('/trello/members/me/organizations')
            .respond(200, expectedOrgs);
        controller = $controller('SprintCtrl', { $scope: scope });
    }));

    afterEach(function () {
        backend.verifyNoOutstandingExpectation();
        backend.verifyNoOutstandingRequest(); 
    });

    describe('Sprint controller', function() {
        it('should save the sprint on save call', function() {
            backend.expectPOST('/sprints', { sprint: sprint }).respond(200, 'ok');
            scope.save(sprint);
            backend.flush();
            expect(scope.notification.type).toBe('success');
        });

        it('should show the failure notification in case of error while saving', function(done) {
            backend.expectPOST('/sprints', { sprint: sprint }).respond(500, 'Internal Server Error');
            scope.save(sprint);
            backend.flush();
            expect(scope.notification.type).toBe('danger'); 
            expect(scope.notification.message).toBe('Internal Server Error'); 
        });    
    });    

    xdescribe('Nav controller', function() {
        
        beforeEach(function () {
            backend.expectGET('/trello/members/me/organizations').respond(200, []);            
        });

        
    });
    
});
