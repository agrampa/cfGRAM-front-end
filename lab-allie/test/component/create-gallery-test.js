'use strict';

describe('Create gallery component', function() {
  beforeEach(() => { /* eslint-disable */
    angular.mock.module('routesApp'); 
    angular.mock.inject(($rootScope, $httpBackend, $window, $componentController) => { 
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$window = $window;
      this.$componentController = $componentController;
      this.createGalleryCtrl = $componentController('createGallery');
    }) 
  })
  
  beforeEach(() => {
    this.createGalleryCtrl.$onInit();
    this.$window.localStorage.setItem('token', 'test token');
  })
  
  afterEach(() => {
    this.$window.localStorage.removeItem('token');
    this.$httpBackend.flush();
    this.$rootScope.$apply();
  })
  
  describe('testing createGalleryCtrl.createGallery()', () => {
    it('should make a valid POST request for all galleries', () => {
      let expectUrl = 'http://localhost:3000/api/gallery';
      let expectHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.$window.localStorage.token}`
      }
      let expectGallery = {
        name: 'gallery one',
        desc: 'description one'
      }
      
      this.$httpBackend.expectPOST(expectUrl, expectGallery, expectHeaders)
        .respond(200, expectGallery);
        
      this.createGalleryCtrl.gallery = expectGallery;
      
      expect(this.createGalleryCtrl.createGallery).not.toThrow();
    });
  })
});