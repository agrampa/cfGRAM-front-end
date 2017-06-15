'use strict';

module.exports = function() {
  return function(galleries, input) {
    if(!input) return galleries;
    return galleries.filter(gallery => {
      if(gallery.name.includes(input)) return gallery;
    });
  };
};