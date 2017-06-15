'use strict';

module.exports = {
  template: require('./thumbnail-container.html'),
  controllerAs: 'thumbnailContainerCtrl',
  bindings: {
    gallery: '<',
  },
  controller: [function() {
    this.$onInit = () => {
      this.title = 'Thumbnails';
      console.log('it worked');
    };
  }],
};