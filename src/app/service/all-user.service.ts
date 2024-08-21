import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllUserService {

  constructor() { }
  public allUsers(){
    return ["San", "Sam", "Vic"]
  }
}
