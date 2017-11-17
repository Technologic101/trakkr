var trakkr;
(function (trakkr) {
    angular.module('trakkr', ['ui.router', 'ngResource', 'ui.bootstrap', 'dndLists']).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
            url: '/',
            templateUrl: '/ngApp/views/home.html',
            controller: trakkr.Controllers.HomeController,
            controllerAs: 'controller'
        })
            .state('users', {
            url: '/users',
            templateUrl: 'ngApp/views/user.html',
            controller: trakkr.Controllers.UserController
        })
            .state('redirect', {
            url: '/slack/redirect',
            templateUrl: 'ngApp/views/redirect.html',
            controller: trakkr.Controllers.SlackController,
            controllerAs: 'controller'
        })
            .state('projects', {
            url: '/projects',
            templateUrl: 'ngApp/views/projects.html',
            controller: trakkr.Controllers.ProjectController,
            controllerAs: 'controller'
        })
            .state('project-single', {
            url: '/project/:id',
            templateUrl: 'ngApp/views/project-single.html',
            controller: trakkr.Controllers.SingleProjectController,
            controllerAs: 'controller'
        })
            .state('notFound', {
            url: '/notFound',
            templateUrl: '/ngApp/views/notFound.html'
        });
        $urlRouterProvider.otherwise('/notFound');
        $locationProvider.html5Mode(true);
    });
})(trakkr || (trakkr = {}));
