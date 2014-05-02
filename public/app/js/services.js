'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('scrello.services', []).
    factory('notify', function ($rootScope, $timeout) {
        return function (type, isPersistent, message) {
            $rootScope.notification = {
                type: type,
                message: message || ''
            };
            if (!isPersistent)
                $timeout(function() {
                    $rootScope.notification = null;
                }, 3000);
        };
    }).
    factory('organizations', function($http, $q, $rootScope) {        
        var deferred = $q.defer();
        var promise = $http.get('/trello/members/me/organizations', { cache: true })
            .success(function (data) {
                if (data.length > 0) {                    
                    var extendedData = {
                        orgs: data,
                        getCurrent: function () {
                            return $rootScope.currentOrg;
                        },
                        setCurrent: function (org) {
                            $rootScope.currentOrg = org;
                        }
                    };
                    extendedData.setCurrent(data[0]);
                    deferred.resolve(extendedData);
                }
                else
                    deferred.reject('No organizations were found.')
            })
            .error(function (data) {
                deferred.reject(data);
            })
        return deferred.promise;
    }).
    value('version', '0.1');
