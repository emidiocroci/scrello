'use strict';

/* Controllers */

angular.module('scrello.controllers', ['scrello.services']).
    controller('SprintCtrl', function($scope, $http, notify, organizations) {        
        $scope.save = function (sprint) {            
            sprint.org = organizations.getCurrent().id;
            $http.post('/sprints', { sprint: sprint })
                .success(function (data) {
                    notify('success');
                })
                .error(function (data) {
                    notify('danger', false, data);
                });
        };        
    })
    .controller('OrgCtrl', function($scope, $http, notify, organizations) {                
        organizations.then(function (data) {            
            $scope.organizations = data;
            $scope.organization = $scope.organizations.getCurrent();                
        }, function (data) {
            if (data === 'No organizations were found.')
                notify('danger', true, 'You must belong to an organization before to use Scrello! <a href="http://trello.com" class="alert-link">Trello</>');
            else
                notify('danger', true, data + ' Try to reload the page.');
        });        
    });