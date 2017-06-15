'use strict';

module.exports = {
  template: require('./thumbnail.html'),
  controllerAs: 'thumbnailCtrl',
  bindings: {
    pics: '<',
    gallery: '<',
  },
  controller: ['$log', 'picService', function($log, picService) {
    this.$onInit = () => {
      $log.debug('Thumbnail controller');
            
      this.deletePic = () => {
        $log.debug('thumbnailCtrl.deletePic()');
        picService.deletePic(this.gallery, this.pic);
      };
    };
  }],
};