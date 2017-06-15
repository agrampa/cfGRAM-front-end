'use strict';

describe('Navbar controller', function() {
  beforeEach(() => { /* eslint-disable */
    angular.mock.module('routesApp');
    angular.mock.inject(($rootScope, $componentController, $location, $window, authService) => {
      this.$rootScope = $rootScope;
      this.$scope = this.$rootScope.$new();
      this.$window = $window;
      this.$location = $location;
      this.authService = authService;
      this.$componentController = $componentController;
      this.$window.localStorage.setItem('token', 'test token');
      
      this.navbarCtrl = this.$componentController(
        'navbarController',
        {
          scope: this.$scope,
          authService: this.authService
        }
      )
      
      this.navbarCtrl.$onInit();
    })
  })
  
  afterEach(() => {
    this.$rootScope.$apply();
    this.$window.localStorage.removeItem('token');
  });
  
  it('should have a method to the path', () => {
    expect(this.navbarCtrl.checkPath).toEqual(jasmine.any(Function));
  });
  
  it('should have a method to logout the user', () => {
    expect(this.navbarCtrl.logout).toEqual(jasmine.any(Function));
  });
});