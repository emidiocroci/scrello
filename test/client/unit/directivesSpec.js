'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
    
    var elem;
    var scope;

    beforeEach(module('scrello.directives'));

    beforeEach(inject(function ($rootScope, $compile) {
        elem = angular.element('<notification type=""/>');
        scope = $rootScope.$new();
        $compile(elem)(scope);
        scope.$digest();
    }));

    describe('notifications', function() {
        it('should show a green alert if type is success', inject(function () {
            scope.type = 'success';
            console.log(elem[0]);
        }));
    });
});
