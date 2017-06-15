'use strict';

module.exports = {
  template: require('./edit-gallery.html'),
  controllerAs: 'editGalleryCtrl',
  bindings: {
    gallery: '<',
  },
  controller: ['$log', 'galleryService', '$rootScope', function($log, galleryService, $rootScope) {
    this.$onInit = () => {
      $log.debug('edit gallery controller');
      
      this.updateGallery = () => {
        galleryService.updateGallery(this.gallery)
        .then(
          () => $log.log('Successfully updated!'),
          $rootScope.$on('locationChangeSuccess', this.fetchGalleries),
          err => $log.error(err)
        );
      };
    };
  }],
};