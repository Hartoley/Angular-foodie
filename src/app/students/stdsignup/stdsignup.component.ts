import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { LandingHeaderComponent } from '../../component/landing-header/landing-header.component';

@Component({
  selector: 'app-stdsignup',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, LandingHeaderComponent],
  templateUrl: './stdsignup.component.html',
  styleUrl: './stdsignup.component.css'
})
export class StdsignupComponent {
  constructor(public router: Router, public http:HttpClient ){}
  public allUsers: any = [];
  public hidePassword = true;
  public users: any = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  

  message: string = '';
  

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  ngOnInit() {
    this.http.get('http://localhost/php/user.php').subscribe((users: any) => {
      this.allUsers = users;
      // console.log(users);
    });
  }

  onSubmit() {
    console.log(this.users);
    this.http.post('http://localhost/php/students/stdsignup.php', this.users,{
      headers:{
        "Content-Type": "application/json"
      }
    })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.message = response.message;
          this.router.navigate(['studentsignin'])  
        },
        (error) => {
          console.log(error);
          
          this.message = 'Error occurred during registration.';
        }
      );
   
  }
}
