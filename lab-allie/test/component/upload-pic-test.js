'use strict';
/* eslint-disable */
describe('Upload Pic Controller', function() {
  beforeEach(() => {
    angular.mock.module('routesApp');
    angular.mock.inject(($rootScope, $window, $httpBackend, $componentController, picService, authService) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
      
      this.$componentController = $componentController;
      this.authService = authService;
      this.mockBindings = {
        pic: {
          name: 'one',
          desc: 'one',
          file: 'fileOne',
          _id: '123',
        }, 
        gallery: {
          name: 'galleryOne',
          desc: 'descOne',
          pics: [],
          _id: '456',
        },
      };
      
      this.$window.localStorage.token = 'test token';
      
      this.scope = this.$rootScope.$new();
      
      this.picService = picService;
      
      this.uploadPicCtrl = this.$componentController(
        'uploadPic',
        {
          scope: this.scope,
          picService: this.picService,
        },
        this.mockBindings
      );
      this.uploadPicCtrl.$onInit();

    })
  });
      
  afterEach(() => {
    delete this.uploadPicCtrl;
    delete this.$window.localStorage.token;
  });
  
  describe('Default functional methods', () => {
    it('should have an object', () => {
      expect(this.uploadPicCtrl.pic).toEqual(jasmine.any(Object));
    });
    
    beforeEach(() => {
      this.expectUrl = 'http://localhost:3000/api/gallery/456/pic/123';
      
      this.expectHeaders = {
        Accept: 'application/json, text/plain, */*',
        Authorization: `Bearer ${this.$window.localStorage.token}`,
      };
    });
    
    describe('uploadPicCtrl.uploadPic()', () => {
      it('should accept a valid POST request', () => {
        this.$httpBackend.expectPOST(this.expectUrl, this.expectHeaders).respond(200);
        
        this.uploadPicCtrl.uploadPic();
        
        expect(this.uploadPicCtrl.uploadPic).not.toThrow();
      });
      
      // it('should add the picture to the gallery', () => {
      //   
      // });
    });
  });
});