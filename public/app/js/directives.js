'use strict';

/* Directives */


angular.module('scrello.directives', []).
  directive('notification', ['$compile', function($compile) {
    return {
        restrict: 'E',
        scope: {
            notificationType: '=',
            notificationMessage: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('notificationType', function () {
                if (!scope.notificationType)
                    element.html('');
                else
                    element.html('<div class="alert alert-' + scope.notificationType + '">'+ scope.notificationMessage  +'</div>');
        });
        }
    };
  }]);
