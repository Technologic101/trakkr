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
        var SlackChatController = (function () {
            function SlackChatController($http) {
                this.data = {
                    "text": "Hi from Trakkr!"
                };
                this.payload = encodeURI("payload=" + JSON.stringify(this.data));
                this.hello = this.payload;
                this.$http = $http;
            }
            SlackChatController.prototype.sendTest = function () {
                this.$http({
                    url: 'https://hooks.slack.com/services/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',
                    method: "POST",
                    data: this.payload,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (res) {
                    console.log(res);
                }, function (err) {
                    console.log(err);
                });
            };
            return SlackChatController;
        }());
        Controllers.SlackChatController = SlackChatController;
        angular.module('trakkr').controller('SlackChatController', SlackChatController);
    })(Controllers = trakkr.Controllers || (trakkr.Controllers = {}));
})(trakkr || (trakkr = {}));
