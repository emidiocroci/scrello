'use strict';

/* Directives */


angular.module('scrello.directives', []).
  directive('notification', ['$compile', function($compile) {
    return {
        restrict: 'E',
        scope: {
            type: '=type'
        },
        replace: true,
        template: '<div class="alert alert-success"></div>',
        link: function (scope, element, attrs) {
            scope.$watch('type', function () {
                console.log('ciao');
            });
        }
    };
  }]);
