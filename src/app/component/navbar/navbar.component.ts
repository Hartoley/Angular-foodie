import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public router: Router){}
  public logged: string= "Log in"
  public currentUser = localStorage.getItem('currentUser')

  logout(){
    localStorage.removeItem('currentUser')
    this.router.navigate(['login'])
  }
}
