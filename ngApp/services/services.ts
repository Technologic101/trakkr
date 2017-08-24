namespace trakkr.Services {
  export class ProjectService {
    private ProjectResource;

    public get(id) {
      return this.ProjectResource.get({id:id}).$promise;
    }

    public list() {
      return this.ProjectResource.query();
    }

    public save(project) {
      return this.ProjectResource.save(project).$promise;
    }

    public remove(id) {
      return this.ProjectResource.delete({id:id}).$promise;
    }

    constructor($resource:ng.resource.IResourceService) {
      this.ProjectResource = $resource('/api/projects/:id');
    }
  }

  angular.module('trakkr').service('ProjectService', ProjectService);

  export class UserService {
    private UserResource;
    private user:any = {};

    public get(id) {
      return this.UserResource.get({id:id});
    }

    public list() {
      return this.UserResource.query();
    }

    public save(data) {
      this.user.name = data.user.name;
      this.user.email = data.user.email;
      this.user.access_token = data.access_token;
      this.user.id = data.user.id;

      return this.UserResource.save(this.user, function (data) {
         return data;
       }, function (err) {
         console.log(err);
       }).$promise;
    }

    public signIn(code) {
      let service = this;

      return new Promise( function(resolve, reject) {
        service.$http({
          method: 'POST',
          url: '/api/users/slackAuth',
          data: {code: code}
        }).then(function success(res) {
          //console.log('from then method' + JSON.stringify(res.data));
          return service.save(res.data).then( (result) => {
            console.log('from signIn callback ' + result);
            resolve(result);
          }).$promise;
        }, function error(err) {
          console.log(err);
        });
      });
    }

    constructor($resource:ng.resource.IResourceService,
                private $http:ng.IHttpService,
                ) {
      this.UserResource = $resource('/api/users/:id');
    }
  }

  angular.module('trakkr').service('UserService', UserService);

  export class IssueService {
    private IssueResource;

    public get(id) {
      return this.IssueResource.get({id:id});
    }

    public list() {
      return this.IssueResource.query();
    }

    public save(issue) {
      return this.IssueResource.save(issue).$promise;
    }

    public remove(id) {
      return this.IssueResource.delete({id:id}).$promise;
    }

    constructor($resource:ng.resource.IResourceService) {
      this.IssueResource = $resource('/api/issues/:id');
    }
  }

  angular.module('trakkr').service('IssueService', IssueService);

}
