'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('scrello.services', []).
    factory('notify', function ($rootScope, $timeout) {
        return function (type, message) {
            $rootScope.notification = {
                type: type,
                message: message || ''
            };
            $timeout(function() {
                $rootScope.notification = null;
            }, 3000);
        };
    }).
    value('version', '0.1');
