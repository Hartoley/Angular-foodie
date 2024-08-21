import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-one-user',
  standalone: true,
  imports: [],
  templateUrl: './one-user.component.html',
  styleUrl: './one-user.component.css'
})
export class OneUserComponent {
  constructor(public act:ActivatedRoute){}
  public id:number = 0

  ngOnInit(){
  this.id = this.act.snapshot.params['id']
  console.log(this.id);
  }
}
