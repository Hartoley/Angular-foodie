import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AllUserService } from '../service/all-user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CounterserviceService } from '../counterservice.service';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css'
})
export class SwitchComponent {
  public date = new Date().getDay();
  public counter:number=0
  constructor(public allUser: AllUserService, public http:HttpClient, public counterService: CounterserviceService){
    this.counterService.counter.subscribe(val=>{
      this.counter = val
    })
  } 
  public allUserData = this.allUser.allUsers()
  public fetchedInfo:any;
  ngOnInit(){
      console.log(this.allUser.allUsers);
      this.http.get('http://localhost/php/user.php').
      subscribe((info: any)=>{
        console.log(info);
        this.fetchedInfo = info
        
      },
      (error) => {
        console.error('Error fetching data:', error);
      })

   
    
  }

  addup(){
    this.counterService.increase()
  }

  minus(){
    this.counterService.decrease()
  }

  fetchOneuser(){
    this.http.get('https://dummyjson.com/users/5').
    subscribe((infos: object)=>{
        console.log(infos);
        
    })
  }
  
}
