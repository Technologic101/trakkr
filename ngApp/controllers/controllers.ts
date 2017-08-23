namespace trakkr.Controllers {

  export class UserController {
    public user;
    public id;

    public save() {
      this.user.id = this.id;
      this.userService.save(this.user).then(() => {
        this.$state.go('home');
      });
    }

    constructor(
      private userService:trakkr.Services.UserService,
      private $state:ng.ui.IStateService,
      private $stateParams:ng.ui.IStateParamsService
    ) {
      //this.id = $stateParams['id'];
    }
  }


  export class NavbarController {
    private payload;
    private token;

    constructor (
    ) {
      this.token = window.localStorage['token'];

      if(this.token) {
       this.payload = JSON.parse(window.atob(this.token.split('.')[1]));
      }
    }
  }

  angular.module('trakkr').controller('NavbarController', NavbarController);
}
