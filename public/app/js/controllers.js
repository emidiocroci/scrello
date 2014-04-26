'use strict';

/* Controllers */

angular.module('scrello.controllers', ['scrello.services']).
    controller('SprintCtrl', function($scope, $http, notify) {        
        $scope.save = function (sprint) {
            $http.post('/sprints', { sprint: sprint })
                .success(function (data) {
                    notify('success');
                })
                .error(function (data) {
                    notify('danger', data);
                });
        }        
    })
    .controller('MyCtrl2', [function() {

    }]);