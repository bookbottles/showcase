'use strict';

module.exports = route;

/**
 * @ngInject
 */
function route($stateProvider) {
    // Configure states here
    $stateProvider
        .state('signup', {
            url: '/signup',
            template: require('./templates/signup.tpl.jade'),
            controller: 'SignUpCtrl as vm'
        });
}
