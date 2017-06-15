'use strict';

describe('Testing the Thumbnail Container Controller', function() { /* eslint-disable */
  beforeEach(() => {    
    angular.mock.module('routesApp');
    angular.mock.inject(($componentController, $rootScope) => {
      this.$componentController = $componentController;
      this.$rootScope = $rootScope;
      this.thumbnailContainerCtrl = new $componentController('thumbnailContainer');
      this.thumbnailContainerCtrl.$onInit();
    });
  });
  
  
  it('should have a title', () => {    
    expect(this.thumbnailContainerCtrl.title).toEqual('Thumbnails');
    expect(this.thumbnailContainerCtrl.title).toEqual(jasmine.any(String));
  });
});