import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Users {
constructor(data) {
        this.data = data;
        this.USER_SERVICE = 'users';
    }

async save(user){
    if(user){
  let serverResponse = await this.data.post(user, this.USER_SERVICE);
         return serverResponse;
 }
}
}
