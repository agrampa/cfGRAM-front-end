'use strict';

describe('Testing the Signup Controller', function() {
  beforeEach(() => {  /* eslint-disable */
    angular.mock.module('routesApp'); 
    angular.mock.inject(($rootScope, $componentController, $window, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
      this.signupCtrl = $componentController('signupController')
    });
  });
  
  beforeEach(() => {
    this.signupCtrl.$onInit();
  })
  
  afterEach(() => {
    this.$window.localStorage.removeItem('token');
  });
  
  describe('testing signupCtrl.signup()', () => {
    
    it('should make a valid POST request to sign up', () => {
      this.$window.localStorage.token = null;
      let expectUser = {
        name: 'testname',
        email: 'test@test.com',
        password: 'password'
      };
      
      let expectUrl = 'http://localhost:3000/api/signup';
      
      let expectConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };
      
      this.$httpBackend.whenPOST(expectUrl, expectUser, expectConfig).respond(200, 'user token');
      
      this.signupCtrl.signup(expectUser).then(() => {
        expect(this.$window.localStorage.token).toEqual('user token');
        this.$httpBackend.flush();
        this.$rootScope.$apply();
      });
    })
    
    it('should have a title property', () => {
      expect(this.signupCtrl.title).toEqual('Please sign in!');
      expect(this.signupCtrl.title).toEqual(jasmine.any(String));
    });
  })
  
});


