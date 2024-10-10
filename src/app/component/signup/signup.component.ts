import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, NavbarComponent,FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']  
})
export class SignupComponent {
  constructor(public router: Router, public http: HttpClient) {}
  public allUsers: any = [];
  public isLandingPage: boolean = false;
  public users: any = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  message: string = '';

  ngOnInit() {
    this.http.get('http://localhost/php/user.php').subscribe((users: any) => {
      this.allUsers = users;
      // console.log(users);
    });
  }

  onSubmit() {
    console.log(this.users);
    this.http.post('http://localhost/php/admin/signupang.php', this.users,{
      headers:{
        "Content-Type": "application/json"
      }
    })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.message = response.message;
          this.router.navigate(['login'])  
        },
        (error) => {
          console.log(error);
          
          this.message = 'Error occurred during registration.';
        }
      );
   
  }
}
