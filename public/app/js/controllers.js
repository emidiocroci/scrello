'use strict';

/* Controllers */

angular.module('scrello.controllers', ['scrello.services']).
    controller('SprintCtrl', function($scope, $http, success) {        
        $scope.save = function (sprint) {
            $http.post('/sprints', { sprint: sprint })
                .success(function (data) {
                    success();
                });
        }
    })
    .controller('MyCtrl2', [function() {

    }]);