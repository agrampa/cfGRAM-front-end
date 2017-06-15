'use strict';

describe('Testing the Home Controller', function() {
  beforeEach(() => { /* eslint-disable */
    angular.mock.module('routesApp'); 
    angular.mock.inject(($rootScope, $controller, $window, $httpBackend, galleryService) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
      this.homeCtrl = new $controller('HomeController');
      this.galleryService = galleryService;
      this.$window.localStorage.setItem('token', 'test token');
    });
  });
  
  afterEach(() => {
    this.$window.localStorage.removeItem('token');
  });
  
  describe('should execute the fetchGalleries method', () => {
    beforeEach(() => {      
      this.expectUrl = 'http://localhost:3000/api/gallery';
      
      this.expectHeaders = {
        'Accept': 'application/json',
        Authorization: `Bearer ${this.$window.localStorage.token}`
      };
    });
    
    afterEach(() => {
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
    
    this.expectGalleries = [
      {
        name: 'one',
        desc: 'one',
        _id: '123'
      },
      {
        name: 'two',
        desc: 'two',
        _id: '456'
      }
    ];
    
    it('should make a valid GET request', () => {
      this.$httpBackend.expectGET(this.expectUrl, this.expectHeaders).respond(200);
      this.homeCtrl.$onInit();
    });

    it('should fetch the galleries', () => {
      this.$httpBackend.whenGET(this.expectUrl, this.expectHeaders).respond(200, this.expectGalleries);
      this.homeCtrl.$onInit();
    });    
  });
  
  describe('Tesing the initial properties', () => {
    beforeEach(() => {
      this.homeCtrl.$onInit();
    });
    
    it('should have a title property', () => {
      expect(this.homeCtrl.title).toEqual('Welcome to cfGram!');
      expect(this.homeCtrl.title).toEqual(jasmine.any(String));
    });
    
    it('should have an empty galleries array', () => {
      expect(this.homeCtrl.galleries).toEqual([]);
      expect(this.homeCtrl.galleries).toEqual(jasmine.any(Array));
    });
  });
});