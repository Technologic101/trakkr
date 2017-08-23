var trakkr;
(function (trakkr) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController() {
                this.message = "Please sign in using Slack.";
                this.token = window.localStorage['token'];
                if (this.token) {
                    this.payload = JSON.parse(window.atob(this.token.split('.')[1]));
                    console.log(this.payload);
                    this.message = "Welcome, " + this.payload.name + ".";
                }
            }
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
    })(Controllers = trakkr.Controllers || (trakkr.Controllers = {}));
})(trakkr || (trakkr = {}));
