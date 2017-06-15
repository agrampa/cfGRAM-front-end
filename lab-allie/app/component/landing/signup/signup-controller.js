'use strict';

module.exports = {
  template: require('./signup.html'),
  controllerAs: 'signupCtrl',
  controller: [
    '$log',
    '$location',
    'authService',
    function($log, $location, authService) {
      this.$onInit = () => {

        $log.debug('#signupCtrl');
        
        this.title = 'Please sign in!';

        this.signup = function(user) {
          $log.debug('#signupCtrl.signup');
          
          return authService.signup(user)
          .then(() => $location.url('/home'));
        };
        
      };
    },
  ],
};