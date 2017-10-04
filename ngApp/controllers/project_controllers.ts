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
    private users;
    private newIssue:any;

    private statuses = ['open', 'priority', 'on hold', 'client feedback', 'complete'];

    public addIssue(issue) {
      issue.project_id = this.project._id;
      issue.status = 'open';
      this.IssueService.save(issue).then((project) => {
        this.project = project;
        this.issues = project.issues;
      });
    }

    public updateIssue(issue, status) {
      issue.status = status;
      issue.project_id = this.project._id;

      console.log(issue);
      this.IssueService.save(issue).then((project) => {
        this.project = project;
        this.issues = project.issues;
        console.log("This should be project: " + JSON.stringify(project));
        alert('status updated');
      });
    }

    constructor (
      private $stateParams:ng.ui.IStateParamsService,
      private ProjectService:trakkr.Services.ProjectService,
      private IssueService:trakkr.Services.IssueService,
      private UserService:trakkr.Services.UserService
    ) {
      let id = $stateParams['id'];
      this.users = UserService.list();

      ProjectService.get(id).then((project) => {
        this.project = project;
        this.issues = project.issues;
      });
    }
  }
}
