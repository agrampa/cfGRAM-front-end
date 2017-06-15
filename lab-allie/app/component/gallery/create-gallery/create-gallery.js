'use strict';

// require scss

module.exports = {
  template: require('./create-gallery.html'),
  controllerAs: 'createGalleryCtrl',
  controller: ['$log', 'galleryService', '$rootScope', function($log, galleryService, $rootScope) {
    this.$onInit = () => {
      $log.debug('Create Gallery Controller');
      this.gallery = {};
      
      return this.createGallery = () => {
        return galleryService.createGallery(this.gallery)
        .then(() => {
          let res = this.gallery;
          this.gallery.name = null;
          this.gallery.desc = null;
          $rootScope.$emit('newGalleryCreation');
          return res;
        })
        .catch(err => $log.error(err));
      };
    };
  }],
};