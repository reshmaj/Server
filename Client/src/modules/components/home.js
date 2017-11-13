import { Users } from '../resources/data/users';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Home {
  constructor(router) {
	this.router = router;
          this.message = 'Home';
  }

  showRegister(){
    this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
        }
        this.registerError = "";
        this.showLogin = false;
}

    async save() {
    console.log()
          let serverResponse = await this.users.save(this.user);
          if (!serverResponse.error) {
            this.showLogin = true;
          } else {
            this.registerError = "There was a problem registering the user."
          }
    }
login(){
    this.router.navigate('list');
}
}


