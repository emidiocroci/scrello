'use strict';

/* Directives */


angular.module('scrello.directives', []).
  directive('notifications', [function() {
    return {
        restrict: 'E',
        scope: {
            type: '=type'
        }
    };
  }]);
