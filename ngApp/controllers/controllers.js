var trakkr;
(function (trakkr) {
    var Controllers;
    (function (Controllers) {
        var UserController = (function () {
            function UserController(userService, $state, $stateParams) {
                this.userService = userService;
                this.$state = $state;
                this.$stateParams = $stateParams;
            }
            UserController.prototype.save = function () {
                var _this = this;
                this.user.id = this.id;
                this.userService.save(this.user).then(function () {
                    _this.$state.go('home');
                });
            };
            return UserController;
        }());
        Controllers.UserController = UserController;
        var NavbarController = (function () {
            function NavbarController() {
                this.token = window.localStorage['token'];
                if (this.token) {
                    this.payload = JSON.parse(window.atob(this.token.split('.')[1]));
                }
            }
            return NavbarController;
        }());
        Controllers.NavbarController = NavbarController;
        angular.module('trakkr').controller('NavbarController', NavbarController);
    })(Controllers = trakkr.Controllers || (trakkr.Controllers = {}));
})(trakkr || (trakkr = {}));
