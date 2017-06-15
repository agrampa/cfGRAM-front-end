'use strict';

// require scss 

module.exports = [
  '$log', '$rootScope', 'galleryService',
  function($log, $rootScope, galleryService) {
    this.$onInit = () => {
      $log.debug('HomeController()');
      
      this.title = 'Welcome to cfGram!';
      
      this.galleries = [];
      
      this.fetchGalleries = () => {
        return galleryService.fetchGalleries()
        .then(galleries => {
          this.galleries = galleries;
          this.currentGallery = this.galleries[0];
        })
        .catch(err => $log.error(err));
      };
      
      $rootScope.$on('locationChangeSuccess', this.fetchGalleries);
      $rootScope.$on('newGalleryCreation', this.fetchGalleries);
      
      this.fetchGalleries();
    };
  },
];