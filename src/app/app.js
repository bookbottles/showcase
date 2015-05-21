angular.module('bookbottles-showcase', [
    'ui.router',
    'templates-app'
])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        // Configure states here
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'showcase/templates/home.tpl.html'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'showcase/templates/signup.tpl.html'
            });

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    });