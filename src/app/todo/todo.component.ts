import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  constructor(public router: Router){}
  public todo:string = "Sleep at 10pm"
  public newTodo = ""
  public allTodo:Array<string> =[]
  public displayForm:boolean = false
  public ind:number = 0
  // public saveduser: any = 
  public userInfo: Array<{ userName: string, emailAddress: string, course: string, location: string }>
   = JSON.parse(localStorage.getItem('userInfo')!) || []
  public item = {
    userName: "",
    emailAddress: "",
    course: "",
    location: ""
  };

  public newItem = {
    userName: "",
    emailAddress: "",
    course: "",
    location: ""
  };
  
    
  

  writeSomething(){
    // console.log(this.newTodo);
    
  }

  addTodo(){
    this.allTodo.push(this.newTodo)
    console.log(this.allTodo);
    
  }

  addToList(){
    
    if (this.item.userName && this.item.emailAddress && this.item.course && this.item.location) {
      this.userInfo.push(this.item); 
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
      this.item = {
        userName: "",
        emailAddress: "",
        course: "",
        location: ""
      };
      console.log(this.userInfo);
    } else {
      console.log("Please fill in all fields.");
    }


    
  }

  editUser(i:number){
    console.log(i);
    const ind = i
    this.displayForm = true
    console.log(this.userInfo[i]);
    this.newItem = this.userInfo[i]
    // this .router. navigate(['login'])
    
  }

  deleteUser(i:number){
    console.log(i);
    this.ind = i;
    this.userInfo.splice(i, 1);
  }

  editUserInfo(){
    // this.userInfo[this.ind] = this.newItem
    this.displayForm = false;
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    this.newItem = {
      userName: "",
      emailAddress: "",
      course: "",
      location: ""
    };
  
    
  }
}
