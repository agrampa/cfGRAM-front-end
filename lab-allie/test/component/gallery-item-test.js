'use strict';

describe('Gallery item component', function() {
  beforeEach(() => { /* eslint-disable */
    angular.mock.module('routesApp');
    angular.mock.inject(($rootScope, $httpBackend, $window, $componentController, authService) => {
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.$window = $window;
      this.$componentController = $componentController;
      this.authService = authService;
      this.galleryItemCtrl = $componentController('galleryItem');
    })
  });
  
  beforeEach(() => {
    this.galleryItemCtrl.$onInit();
    this.$window.localStorage.setItem('token', 'test token');
  });
  
  describe('testing galleryItemCtrl.deleteGallery()', () => {
    it('should call the delete method', () => {
      let mockBindings = {
        gallery: {
          name: 'test name',
          desc: 'test description',
          _id: '123'
        },
        deleteGallery: function(gallery) {
          expect(gallery._id).toEqual('123');
          expect(gallery.name).toEqual('test name');
          expect(gallery.desc).toEqual('test description');
        }
      }
    });
    
    it('should delete the gallery', () => {
      let expectUrl = 'http://localhost:3000/api/gallery/123';
      
      let expectHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.$window.localStorage.token}`
      }
      
      let mockBindings = {
        gallery: {
          name: 'test name',
          desc: 'test description',
          _id: '123'
        }
      }
      
      this.$rootScope.$apply();
      
      this.$httpBackend.whenDELETE(expectUrl, expectHeaders).respond(204);
      
      this.galleryItemCtrl.gallery = mockBindings.gallery;
            
      expect(this.galleryItemCtrl.deleteGallery).not.toThrow();
      
      expect(this.galleryItemCtrl.showEditGallery).toBe(false);
    });
    
  });
  
});