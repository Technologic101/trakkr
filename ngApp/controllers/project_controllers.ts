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
    private http;
    private url;

    private statuses = ['open', 'priority', 'on hold', 'client feedback', 'complete'];

    // Utility for drag-and-drop sorting and persistence
    private dropSort(index) {
      this.issues.splice(index, 1);
      this.project.issueOrder = this.issues.map( (issue) => issue._id );
      this.ProjectService.save(this.project).then( (project) => {
        this.project = project;
      });
    }

    public addIssue(issue) {

      // Configure Slack payload
      const data = {
        "text": `*${issue.name}*\n${issue.description}\n<${this.url}|Go to Project>`
      };
      const payload = encodeURI("payload=" + JSON.stringify(data));

      // Save Changes
      issue.project = this.project._id;
      issue.status = 'open';
      this.IssueService.save(issue).then((project) => {
        this.project = project;
        this.issues = project.issues;

        // Post New Issue to Slack
        /*this.$http({
          url: 'https://hooks.slack.com/services/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',
          method: "POST",
          data: payload,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then( (res) => {
          console.log(res);
        }, (err) => {
          console.log(err);
        });*/
      });
    }

    public updateIssue(issue, status) {
      issue.status = status;
      issue.project = this.project._id;

      console.log(issue);
      this.IssueService.save(issue).then((project) => {
        this.project = project;
        this.issues = project.issues;
      });
    }

    constructor (
      private $stateParams:ng.ui.IStateParamsService,
      private ProjectService:trakkr.Services.ProjectService,
      private IssueService:trakkr.Services.IssueService,
      private UserService:trakkr.Services.UserService,
      private $http,
    ) {
      let id = $stateParams['id'];
      this.users = UserService.list();
      this.http = $http;

      ProjectService.get(id).then((project) => {
        this.project = project;
        this.url = "https://sonder-trakkr.herokuapp.com/project/" + project._id;
        console.log(project.issues);
        console.log('Issue Order: ' + project.issueOrder);

        this.issues = Array(project.issues.length);
        console.log(this.issues);
        project.issues.forEach( (issue) => {
          let order = project.issueOrder.indexOf(issue._id);
          this.issues[order] = issue;
          console.log(this.issues);
        });
      });
    }
  }
}
