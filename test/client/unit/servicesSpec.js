'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  
    beforeEach(module('scrello.services'));

    describe('notify', function() {    
        it('should set the notification to success', inject( function($rootScope, notify) {
            notify('success');
            expect($rootScope.notification.type).toBe('success');
        }));
        it('should set the notification message to the given value', inject( function($rootScope, notify) {
            notify('success', 'test');
            expect($rootScope.notification.message).toBe('test');
        }));
        it('should set the notification message to \'\' if the message is not defined', inject( function($rootScope, notify) {
            notify('danger');
            expect($rootScope.notification.message).toBe('');
        }));
        it('should clear the notification after 3 seconds', inject( function($rootScope, notify, $timeout) {
            notify('danger');
            expect($rootScope.notification.message).toBe('');
            $timeout.flush();            
            expect($rootScope.notification).toBe(null);            
        }));
    });
});
