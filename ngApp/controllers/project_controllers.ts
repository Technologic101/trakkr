namespace trakkr.Controllers {
  export class ProjectController {
    private projects;
    private project;
    private payload;
    private users;
    private token = window.localStorage['token'];

    public saveProject() {
      this.ProjectService.save(this.project).then(() => {
        this.projects = this.ProjectService.list();
      });
    }

    public remove(id) {
      this.ProjectService.remove(id).then(() => {
        this.projects = this.ProjectService.list();
      });
    }

    constructor(
      private ProjectService:trakkr.Services.ProjectService,
      private UserService:trakkr.Services.UserService
    ) {
      this.projects = ProjectService.list();
      this.users = UserService.list();
      if(this.token) {
       this.payload = JSON.parse(window.atob(this.token.split('.')[1]));
      }
    }
  }

  export class SingleProjectController {
    private project;
    private issues;
    private newIssue:any;

    private statuses = ['open', 'priority', 'on hold', 'client feedback', 'complete'];

    public addIssue(issue) {
      issue.project_id = this.project._id;
      issue.status = 'open';
      this.IssueService.save(issue).then((project) => {
        this.project = project;
      });
      this.issues.push(issue);
    }

    public updateStatus(status) {
      alert('status set!!!!');
    }

    constructor (
      private $stateParams:ng.ui.IStateParamsService,
      private ProjectService:trakkr.Services.ProjectService,
      private IssueService:trakkr.Services.IssueService,
    ) {
      let id = $stateParams['id'];
      ProjectService.get(id).then((project) => {
        this.project = project;
        this.issues = project.issues;
      });
    }
  }
}
