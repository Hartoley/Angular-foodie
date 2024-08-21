import { Component } from '@angular/core';
import { ButtonComponent } from '../component/button/button.component';
import { NavbarComponent } from '../component/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public name ="Keena"
  private course = "Angular"

  public first_name:string = "45"
  public age:number = 45
  public has_paid:boolean = true
  public names:Array<String> = ["Ayo", "Bolu", "Bola"]
  public info:Array<object> =[{name:"Gbemi"}, {name:"Tunde"}]
  public obj:object ={paid:true}
  public arrNumber:Array<number> = [1, 2, 3]
  public IDK:any = null
}
