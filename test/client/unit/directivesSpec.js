'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
    
    var elem;
    var scope;

    beforeEach(module('scrello.directives'));

    beforeEach(inject(function ($rootScope, $compile) {
        elem = angular.element('<notification notification-type="notification"/>');        
        scope = $rootScope.$new();
        $compile(elem)(scope);
    }));

    describe('notifications', function() {
        it('should create a div with class alert-success if type is success', inject(function ($rootScope) {            
            $rootScope.notification = 'success';
            scope.$digest();
            expect(elem.children().hasClass('alert-success')).toBe(true);            
        }));
        it('should not show anything if there is no notification', inject(function ($rootScope) {            
            scope.$digest();
            expect(elem.html()).toBe('');
        }));
        it('should create a div with class alert-warning if type is warning', inject(function ($rootScope) {            
            $rootScope.notification = 'warning';
            scope.$digest();
            expect(elem.children().hasClass('alert-warning')).toBe(true);            
        }));
        it('should create a div with class alert-danger if type is danger', inject(function ($rootScope) {            
            $rootScope.notification = 'danger';
            scope.$digest();
            expect(elem.children().hasClass('alert-danger')).toBe(true);            
        }));
        it('should create a div with class alert-info if type is info', inject(function ($rootScope) {            
            $rootScope.notification = 'info';
            scope.$digest();
            expect(elem.children().hasClass('alert-info')).toBe(true);            
        }));        
    });
});
