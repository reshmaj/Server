import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Users} from '../resources/data/users';
import {AuthService} from 'aurelia-auth';



@inject(Router, Users, AuthService)
export class Home {
  constructor(router, users, auth) {
	this.router = router;
	this.auth = auth;
    this.loginError = '';
	this.users = users;
	this.message = 'Home';
	this.showLogin = true;
 }

  login(){
	  console.log(this.email)
	return this.auth.login(this.email, this.password)
	.then(response => {
    sessionStorage.setItem("user", JSON.stringify(response.user));
    this.loginError = "";
	this.router.navigate('list');
})
.catch(error => {
  console.log(error);
  this.loginError = "Invalid credentials.";
});
};

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
	      let serverResponse = await this.users.save(this.user);
	      if (!serverResponse.error) {
	        this.showLogin = true;
	      } else {
	        this.registerError = "There was a problem registering the user."
	      }
	}
	
save(){
	this.showLogin = true;
}


}


