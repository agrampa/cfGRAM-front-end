'use strict';

describe('Testing the Landing Controller', function() {
  beforeEach(() => { /* eslint-disable */
    angular.mock.module('routesApp');
    angular.mock.inject(($controller) => {
      this.landingCtrl = new $controller('LandingController');
      this.landingCtrl.$onInit();
    });
  });
  
  it('should have a title', () => {
    expect(this.landingCtrl.title).toEqual('Please sign in!');
    expect(this.landingCtrl.title).toEqual(jasmine.any(String));
    expect(this.landingCtrl.showSignup).toBe(false);
  });
});