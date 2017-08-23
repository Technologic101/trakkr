var trakkr;
(function (trakkr) {
    var Controllers;
    (function (Controllers) {
        var SlackController = (function () {
            function SlackController($state, $stateParams, $scope, $location, UserService, $window) {
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.$scope = $scope;
                this.$location = $location;
                this.UserService = UserService;
                this.$window = $window;
                this.message = "Loading...";
                $scope.location = $location;
                var code = $location.search().code;
                var instance = this;
                UserService.signIn(code).then(function (result) {
                    $window.localStorage.setItem('token', result.token);
                    $state.go('home');
                }, function (err) {
                    console.log(err);
                    instance.message = "Sorry, there was a problem with the login.";
                });
            }
            return SlackController;
        }());
        Controllers.SlackController = SlackController;
    })(Controllers = trakkr.Controllers || (trakkr.Controllers = {}));
})(trakkr || (trakkr = {}));
