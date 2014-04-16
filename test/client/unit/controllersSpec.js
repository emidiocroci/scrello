'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
    var sprint = {
        start: '12/10/2014',
        length: 2
    };
    var backend;
    var scope;
    var controller;

    beforeEach(module('scrello.controllers'));

    beforeEach(inject(function ($injector, $controller) {
        backend = $injector.get('$httpBackend');
        scope = $injector.get('$rootScope');
        controller = $controller('SprintCtrl', { $scope: scope });
    }));

    afterEach(function () {
        backend.verifyNoOutstandingExpectation();
        backend.verifyNoOutstandingRequest(); 
    });

    it('should save the sprint on save call', function() {
        backend.expectPOST('/sprints', { sprint: sprint }).respond(200, 'ok');
        scope.save(sprint);
        backend.flush();
        expect(scope.notification.type).toBe('success');
    });
});
