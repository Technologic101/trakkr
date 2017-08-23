var trakkr;
(function (trakkr) {
    var Services;
    (function (Services) {
        var ProjectService = (function () {
            function ProjectService($resource) {
                this.ProjectResource = $resource('/api/projects/:id');
            }
            ProjectService.prototype.get = function (id) {
                return this.ProjectResource.get({ id: id }).$promise;
            };
            ProjectService.prototype.list = function () {
                return this.ProjectResource.query();
            };
            ProjectService.prototype.save = function (project) {
                return this.ProjectResource.save(project).$promise;
            };
            ProjectService.prototype.remove = function (id) {
                return this.ProjectResource.delete({ id: id }).$promise;
            };
            return ProjectService;
        }());
        Services.ProjectService = ProjectService;
        angular.module('trakkr').service('ProjectService', ProjectService);
        var UserService = (function () {
            function UserService($resource, $http) {
                this.$http = $http;
                this.user = {};
                this.UserResource = $resource('/api/users/:id');
            }
            UserService.prototype.get = function (id) {
                return this.UserResource.get({ id: id });
            };
            UserService.prototype.list = function () {
                return this.UserResource.query();
            };
            UserService.prototype.save = function (data) {
                this.user.name = data.user.name;
                this.user.email = data.user.email;
                this.user.access_token = data.access_token;
                this.user.id = data.user.id;
                return this.UserResource.save(this.user, function (data) {
                    return data;
                }, function (err) {
                    console.log(err);
                }).$promise;
            };
            UserService.prototype.signIn = function (code) {
                var service = this;
                return new Promise(function (resolve, reject) {
                    service.$http({
                        method: 'POST',
                        url: '/api/users/slackAuth',
                        data: { code: code }
                    }).then(function success(res) {
                        return service.save(res.data).then(function (result) {
                            resolve(result);
                        }).$promise;
                    }, function error(err) {
                        console.log(err);
                    });
                });
            };
            return UserService;
        }());
        Services.UserService = UserService;
        angular.module('trakkr').service('UserService', UserService);
        var IssueService = (function () {
            function IssueService($resource) {
                this.IssueResource = $resource('/api/issues/:id');
            }
            IssueService.prototype.get = function (id) {
                return this.IssueResource.get({ id: id });
            };
            IssueService.prototype.list = function () {
                return this.IssueResource.query();
            };
            IssueService.prototype.save = function (issue) {
                return this.IssueResource.save(issue).$promise;
            };
            IssueService.prototype.remove = function (id) {
                return this.IssueResource.delete({ id: id }).$promise;
            };
            return IssueService;
        }());
        Services.IssueService = IssueService;
        angular.module('trakkr').service('IssueService', IssueService);
    })(Services = trakkr.Services || (trakkr.Services = {}));
})(trakkr || (trakkr = {}));
