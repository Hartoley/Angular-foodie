import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newtodo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newtodo.component.html',
  styleUrl: './newtodo.component.css'
})
export class NewtodoComponent {
  constructor(public router: Router) {}

  public name: string = "";
  public description: string = "";
  
  public todoArray: any =JSON.parse(localStorage.getItem('wishlist')!) || [];
  // public todoArray: any = [];
  public todoEdit: { name: string; description: string } = { name: '', description: '' };
  public displayTodo: boolean = false;
  public ind: number = 0;

  add_todo() {
    const newTodo = {
      name: this.name,
      description: this.description,
      timestamp: new Date().toLocaleString()
    };

    this.todoArray.push(newTodo);
    console.log(this.todoArray);
    localStorage.setItem("wishlist", JSON.stringify(this.todoArray));
    this.name = "";
    this.description = "";
    
  }

  edit_todo(i: number) {
    this.displayTodo = true;
    console.log(i);
    this.ind = i;
    this.todoEdit = { ...this.todoArray[i] };
  }

  save_edit() {
    this.todoArray[this.ind] = this.todoEdit;
    localStorage.setItem('wishlist', JSON.stringify(this.todoArray));
    this.todoEdit = { name: '', description: '' };
    this.displayTodo = false;
  }

  delete_todo(i: number) {
    this.todoArray.splice(i, 1);
    localStorage.setItem('wishlist', JSON.stringify(this.todoArray));
    console.log("Todo item deleted");
  }

  
}
