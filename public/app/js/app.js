'use strict';


// Declare app level module which depends on filters, and services
angular.module('scrello', [
  'ngRoute',
  'scrello.filters',
  'scrello.services',
  'scrello.directives',
  'scrello.controllers',
  'ui.date'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/sprint', controller: 'SprintCtrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
