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
    }
  }

  export class SlackChatController {
    private $http;
    private data = {
      "text": "Hi from Trakkr!"
    };
    private payload = encodeURI("payload=" + JSON.stringify(this.data));
    private hello =  this.payload;

    constructor(
      $http
    ) {
      this.$http = $http;
    }

    public sendTest() {
      this.$http({
        url: 'https://hooks.slack.com/services/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',
        method: "POST",
        data: this.payload,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then( (res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });

      //this.$http.post('https://hooks.slack.com/services/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', { text: "Hi from Trakkr!"});
    }
  }
  angular.module('trakkr').controller('SlackChatController', SlackChatController);

}
