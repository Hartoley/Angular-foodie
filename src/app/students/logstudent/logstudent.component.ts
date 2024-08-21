import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logstudent',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './logstudent.component.html',
  styleUrl: './logstudent.component.css'
})
export class LogstudentComponent {
constructor(public router:Router, public http:HttpClient ){}
public Users: any[] = JSON.parse(localStorage.getItem('newUsers')!) ||[]
public allUsers:any
public loggedInUsers:Array <{password: string, email: string}>=[]
public logged : any ={

}

message: string = '';

sighin(){
  if (this.logged.email && this.logged.password) {
    console.log(this.Users); 
    this.http.post('http://localhost/php/students/stdloginang.php', this.logged ,{
        headers:{
          "Content-Type": "application/json"
        }
    })
    .subscribe(
      (response:any)=>{
        console.log(response.email);
        if (response && response.success) {
          this.message =response.message;
          localStorage.setItem("The token", response.token);
          localStorage.setItem("The email", response.email);
          this.router.navigate(['studentdash'])  
        }else{
          this.message ="Unexpected response from the server"
        }
      },(error)=>{
        console.log(error);
        this.message= error
        
      }
    )

  } else {
    console.log('Please enter email and password');
  }
}

ngOnInit(){
    this.http.get('http://localhost/php/user.php').subscribe((users:any)=>{
      this.allUsers= users
      // console.log(users);
      
    })
}
}
