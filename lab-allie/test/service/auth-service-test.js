'use strict';

describe('Auth Service', function() {
  beforeEach(() => {   /* eslint-disable */
    angular.mock.module('routesApp');
    angular.mock.inject(($httpBackend, $window, $rootScope, authService) => {
      this.$httpBackend = $httpBackend;
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
    });
  });
  
  describe('authService.getToken', () => {
    it('should return a token', () => {
      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'test token');
      
      this.authService.getToken()
      .then(token => {
        expect(token).toEqual(this.$window.localStorage.token);
      })
      .catch(err => {
        expect(err).toEqual(null);
      });
    });
  });
});