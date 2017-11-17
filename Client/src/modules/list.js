import {inject} from 'aurelia-framework';
import {ToDos} from '../resources/data/todos';
//import {Router} from 'aurelia-router';
import { AuthService } from 'aurelia-auth';



@inject(ToDos,AuthService)
export class List {
  constructor(todos, auth){
		this.todos = todos;
		this.auth = auth;
		this.user = JSON.parse(sessionStorage.getItem('user'));
		this.title = "Reshma Has Things ToDo!"
		this.editTodoForm = false;
    this.showCompleted = false;
    this.showList = true;
		this.priorities = ['Low', 'Medium', 'High', 'Critical'];
  }
  
  async activate(){
		                await this.todos.getUserTodos(this.user._id);
                	}

createTodo(){	
  this.todoObj = {
    todo: "",
    description: "",
    dateDue: new Date(),
     userId: this.user._id,
    priority: this.priorities[0]
  }
  this.showList = false;		
}

async saveTodo(){
  if(this.todoObj){		
    let response = await this.todos.save(this.todoObj);
    if(response.error){
      alert("There was an error creating the ToDo");
    } else {
      //Could provide feeback									
    }
    this.showList = true;
  }
}

back(){
  this.showlist=true;
}

logout(){
  // this.router.navigate('home');
  sessionStorage.removeItem('user');
  this.auth.logout();
 }
}

