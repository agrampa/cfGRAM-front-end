'use strict';
/* eslint-disable */

describe('Testing the Login Controller', function() {
  beforeEach(() => { 
    angular.mock.module('routesApp');
    angular.mock.inject(($rootScope, $componentController, $window, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
      this.loginCtrl = $componentController('loginController');
    });
  });
  
  beforeEach(() => {
    this.loginCtrl.$onInit();
    this.$window.localStorage.setItem('token', 'test token');
  });
  
  afterEach(() => {
    this.$window.localStorage.removeItem('token');
  });
  
  describe('testing loginCtrl.login()', () => {
    
    it('should make a valid GET request to log in', () => {
      let expectUser = {
        username: 'testname',
        email: 'test@test.com',
        password: 'password',
      };
      
      let expectUrl = 'http://localhost:3000/api/login';
      
      let base64 = this.$window.btoa(`${expectUser.username}:${expectUser.password}`);
      
      let expectConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Basic ${base64}`,
        },
      };
      // this.createGalleryCtrl.gallery = expectGallery;

      this.loginCtrl.user = expectUser;
      
      this.$httpBackend.expectGET(expectUrl, expectUser, expectConfig).respond(200, 'user token');
      this.loginCtrl.login().then(() => {
        expect(this.$window.localStorage.token).toEqual('user token');
        this.$httpBackend.flush();
        this.$rootScope.$apply();
      });
    });
  });
  
  
});