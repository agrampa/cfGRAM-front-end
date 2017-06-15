'use strict';

describe('Edit gallery component', function() {
  beforeEach(() => { /* eslint-disable */
    angular.mock.module('routesApp');
    angular.mock.inject(($rootScope, $httpBackend, $window, $componentController, authService) => {
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$window = $window;
      this.$componentController = $componentController;
      this.authService = authService;
      this.editGalleryCtrl = $componentController('editGallery');
    });
  });
  
  beforeEach(() => {
    this.editGalleryCtrl.$onInit();
    this.$window.localStorage.setItem('token', 'test token');
  });
  
  describe('testing editGalleryCtrl.updateGallery()', () => {
    it('should update the gallery', () => {
      let mockBindings = {
        gallery: {
          name: 'test name',
          desc: 'test description',
          _id: '123'
        },
        updateGallery: function(gallery) {
          expect(gallery._id).toEqual('123');
          expect(gallery.name).toEqual('test name');
          expect(gallery.desc).toEqual('test description');
        }
      }
    });
    
    it('should update the gallery', () => {
      let expectUrl = 'http://localhost:3000/api/gallery/123';
      
      let expectHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.$window.localStorage.token}`
      };
      
      let mockBindings = {
        gallery: {
          name: 'test name',
          desc: 'test description',
          _id: '123'
        }
      };
      
      let mockUpdate = {
        gallery: {
          name: 'new name',
          desc: 'new description',
          _id: '123',
        }
      };
      
      this.$rootScope.$apply();
      
      this.$httpBackend.whenPUT(expectUrl, mockUpdate, expectHeaders).respond(200);
      
      this.editGalleryCtrl.gallery = mockUpdate.gallery;
      
      expect(this.editGalleryCtrl.updateGallery).not.toThrow();
      expect(this.editGalleryCtrl.gallery.name).toBe('new name');
      expect(this.editGalleryCtrl.gallery.desc).toBe('new description');
    });
  });
  
});