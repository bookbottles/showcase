'use strict';

module.exports = config;

/**
 * @ngInject
 */
function config($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}
