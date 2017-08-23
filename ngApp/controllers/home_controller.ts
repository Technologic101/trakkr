namespace trakkr.Controllers {

  export class HomeController {
    private message:string = "Please sign in using Slack.";
    private payload;
    private token = window.localStorage['token'];

    constructor() {
      //console.log(this.token);
      if(this.token) {
       this.payload = JSON.parse(window.atob(this.token.split('.')[1]));
        console.log(this.payload);
        this.message = "Welcome, " + this.payload.name + ".";
      }
    }
  }
}
