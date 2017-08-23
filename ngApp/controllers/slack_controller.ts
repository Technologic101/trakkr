namespace trakkr.Controllers {
  export class SlackController {
    //private code;
    private message = "Loading...";

    constructor(
      private $state:ng.ui.IStateService,
      private $stateParams:ng.ui.IStateParamsService,
      private $scope,
      private $location,
      private UserService,
      private $window,
    ) {
      $scope.location = $location;
      let code = $location.search().code;
      let instance = this;

      UserService.signIn(code).then(function(result) {
          $window.localStorage.setItem('token', result.token);
          $state.go('home');
        }, function(err) {
          console.log(err);
          instance.message = "Sorry, there was a problem with the login.";
        });
      console.log('after userservice then');
    }
  }
}
