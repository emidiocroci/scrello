'use strict';

describe('Nav controller', function() {

	var controller,
		scope,
		http,
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
        http = $injector.get('$httpBackend');
        scope = $injector.get('$rootScope');        
    }));

	afterEach(function () {
        http.verifyNoOutstandingExpectation();
        http.verifyNoOutstandingRequest(); 
    });

	it('should set the selected organization to the first of the received collection', inject(function($controller) {
		http.expectGET('/trello/members/me/organizations')
			.respond(200, expectedOrgs);
		controller = $controller('NavCtrl', { $scope: scope });        
		http.flush();
		expect(scope.organization.id).toBe(expectedOrgs[0].id);
		expect(scope.organization.name).toBe(expectedOrgs[0].name);
	}));

    it('should notify the user that must belong to an organization if no organization are found', inject(function ($controller) {            
        http.expectGET('/trello/members/me/organizations')
            .respond(200, []);
        controller = $controller('NavCtrl', { $scope: scope });            
        http.flush();
        expect(scope.notification.type).toBe('danger');
        expect(scope.notification.message).toMatch(/trello.com/);            
    }));    

    it('should notify the users if an error occurs while loading organizations', inject(function($controller) {
        http.expectGET('/trello/members/me/organizations')
            .respond(500, 'An error occurred');
        controller = $controller('NavCtrl', { $scope: scope });            
        http.flush();
        expect(scope.notification.type).toBe('danger');
        expect(scope.notification.message).toMatch(/An error occurred/);            
    }));
});