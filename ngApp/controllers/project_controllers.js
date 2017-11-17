var trakkr;
(function (trakkr) {
    var Controllers;
    (function (Controllers) {
        var ProjectController = (function () {
            function ProjectController(ProjectService, UserService) {
                this.ProjectService = ProjectService;
                this.UserService = UserService;
                this.token = window.localStorage['token'];
                this.projects = ProjectService.list();
                this.users = UserService.list();
                if (this.token) {
                    this.payload = JSON.parse(window.atob(this.token.split('.')[1]));
                }
            }
            ProjectController.prototype.saveProject = function () {
                var _this = this;
                this.ProjectService.save(this.project).then(function () {
                    _this.projects = _this.ProjectService.list();
                });
            };
            ProjectController.prototype.remove = function (id) {
                var _this = this;
                this.ProjectService.remove(id).then(function () {
                    _this.projects = _this.ProjectService.list();
                });
            };
            return ProjectController;
        }());
        Controllers.ProjectController = ProjectController;
        var SingleProjectController = (function () {
            function SingleProjectController($stateParams, ProjectService, IssueService, UserService, $http) {
                var _this = this;
                this.$stateParams = $stateParams;
                this.ProjectService = ProjectService;
                this.IssueService = IssueService;
                this.UserService = UserService;
                this.$http = $http;
                this.statuses = ['open', 'priority', 'on hold', 'client feedback', 'complete'];
                var id = $stateParams['id'];
                this.users = UserService.list();
                this.http = $http;
                ProjectService.get(id).then(function (project) {
                    _this.project = project;
                    _this.url = "https://sonder-trakkr.herokuapp.com/project/" + project._id;
                    _this.issues = project.issues;
                });
            }
            SingleProjectController.prototype.addIssue = function (issue) {
                var _this = this;
                issue.project = this.project._id;
                issue.status = 'open';
                var data = {
                    "text": "*" + issue.name + "*\n" + issue.description + "\n<" + this.url + "|Go to Project>"
                };
                var payload = encodeURI("payload=" + JSON.stringify(data));
                this.IssueService.save(issue).then(function (project) {
                    _this.project = project;
                    _this.issues = project.issues;
                    _this.$http({
                        url: 'https://hooks.slack.com/services/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',
                        method: "POST",
                        data: payload,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function (res) {
                        console.log(res);
                    }, function (err) {
                        console.log(err);
                    });
                });
            };
            SingleProjectController.prototype.updateIssue = function (issue, status) {
                var _this = this;
                issue.status = status;
                issue.project = this.project._id;
                console.log(issue);
                this.IssueService.save(issue).then(function (project) {
                    _this.project = project;
                    _this.issues = project.issues;
                });
            };
            return SingleProjectController;
        }());
        Controllers.SingleProjectController = SingleProjectController;
    })(Controllers = trakkr.Controllers || (trakkr.Controllers = {}));
})(trakkr || (trakkr = {}));
