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
            function SingleProjectController($stateParams, ProjectService, IssueService) {
                var _this = this;
                this.$stateParams = $stateParams;
                this.ProjectService = ProjectService;
                this.IssueService = IssueService;
                this.statuses = ['open', 'priority', 'on hold', 'client feedback', 'complete'];
                var id = $stateParams['id'];
                ProjectService.get(id).then(function (project) {
                    _this.project = project;
                    _this.issues = project.issues;
                });
            }
            SingleProjectController.prototype.addIssue = function (issue) {
                var _this = this;
                issue.project_id = this.project._id;
                issue.status = 'open';
                this.IssueService.save(issue).then(function (project) {
                    _this.project = project;
                });
                this.issues.push(issue);
            };
            SingleProjectController.prototype.updateStatus = function (status) {
                alert('status set!!!!');
            };
            return SingleProjectController;
        }());
        Controllers.SingleProjectController = SingleProjectController;
    })(Controllers = trakkr.Controllers || (trakkr.Controllers = {}));
})(trakkr || (trakkr = {}));
