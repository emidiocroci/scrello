'use strict';

/* Controllers */

angular.module('scrello.controllers', ['scrello.services']).
    controller('SprintCtrl', function($scope, $http, notify, organizations) {        
        $scope.save = function (sprint) {
            $http.post('/sprints', { sprint: sprint })
                .success(function (data) {
                    notify('success');
                })
                .error(function (data) {
                    notify('danger', false, data);
                });
        };        
    })
    .controller('NavCtrl', function($scope, $http, notify, organizations) {        
        organizations.then(function (data) {
            $scope.organizations = data;
            $scope.organization = $scope.organizations[0];                
        }, function (data) {
            if (data === 'No organizations were found.')
                notify('danger', true, 'You must belong to an organization before to use Scrello! <a href="http://trello.com" class="alert-link">Trello</>');
            else
                notify('danger', true, data + ' Try to reload the page.');
        });        
    });