import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class ToDos {
    constructor(data) {
                this.data = data;
                this.TODO_SERVICE = 'todos';
                this.todosArray= new Array ();
         }

async getUserTodos(id){
    let response = await this.data.get(this.TODO_SERVICE + "/user/" + id);
    if(!response.error && !response.message){
        this.todosArray = response;
    }
} 

async save(todo){
    if(todo){
    let serverResponse = await this.data.post(todo, this.TODO_SERVICE);
    if(!serverResponse.error){
        this.todosArray.push(serverResponse);
    }
    return serverResponse;
    }
}

    
}
