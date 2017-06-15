'use strict';

describe('Thumbnail Controller', function() {
  beforeEach(() => {  /* eslint-disable */
    angular.mock.module('routesApp');
    angular.mock.inject(($rootScope, $window, $httpBackend, $componentController, picService) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
      
      this.$componentController = $componentController;
      
      this.mockBindings = {
        pic: {
          name: 'one',
          desc: 'one',
          file: 'fileOne',
          _id: '123'
        },
        gallery: {
          name: 'galleryOne',
          desc: 'descOne',
          pics: [],
          _id: '456'
        }
      }
      
      this.$window.localStorage.token = 'test token';
      
      this.scope = this.$rootScope.$new();
      
      this.picService = picService;
      this.thumbnailCtrl = this.$componentController(
        'thumbnail', 
        {
          scope: this.scope,
          picService: this.picService,
        },
        this.mockBindings
      );
      this.thumbnailCtrl.$onInit();
    })
  })
  
  afterEach(() => {
    delete this.thumbnailCtrl;
    delete this.$window.localStorage.token;
  });
  
  describe('Default functional methods', () => {
    beforeEach(() => {
      this.expectUrl = 'http://localhost:3000/api/gallery/456/pic/123';
      
      this.expectHeaders = {
        Accept: 'application/json, text/plain, */*',
        Authorization: `Bearer ${this.$window.localStorage.token}`
      };
    })
    
    afterEach(() => {
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    })
    
    describe('thumbnailCtrl.deletePic()', () => {
      it('should accept a valid DELETE request', () => {
        this.$httpBackend.expectDELETE(this.expectUrl, this.expectHeaders).respond(204);
        
        this.thumbnailCtrl.deletePic();
      })
    });
  });
});

