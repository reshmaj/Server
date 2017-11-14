import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';


@inject(Router)
export class List {
  constructor(router) {
	this.router = router;
          this.message = 'List';
  }

  logout(){
   // this.router.navigate('home');
   sessionStorage.removeItem('user');
   this.auth.logout();
  }
}


