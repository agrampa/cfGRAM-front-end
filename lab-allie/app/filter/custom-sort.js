'use strict';

module.exports = function() {
  return function(galleries) {
    return galleries.sort((a, b) => b.name > a.name);
  };
};