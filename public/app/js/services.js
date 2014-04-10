'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('scrello.services', []).
    factory('success', function ($rootScope, $timeout) {
        return function (message) {
            $rootScope.notification = {
                type: 'success',
                message: message || ''
            };
            $timeout(function() {
                $rootScope.notification = null;
            }, 3000);
        };
    }).
    value('version', '0.1');
