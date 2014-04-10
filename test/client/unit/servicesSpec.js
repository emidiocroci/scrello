'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  
    beforeEach(module('scrello.services'));

    describe('success', function() {    
        it('should set the notification to success', inject( function($rootScope, success) {
            success();
            expect($rootScope.notification.type).toBe('success');
        }));
        it('should set the notification message to the given value', inject( function($rootScope, success) {
            success('test');
            expect($rootScope.notification.message).toBe('test');
        }));
        it('should set the notification message to \'\' if the message is not defined', inject( function($rootScope, success) {
            success();
            expect($rootScope.notification.message).toBe('');
        }));
        it('should clear the notification after 3 seconds', inject( function($rootScope, success, $timeout) {
            success();
            expect($rootScope.notification.message).toBe('');
            $timeout.flush();            
            expect($rootScope.notification).toBe(null);            
        }));
    });
});
