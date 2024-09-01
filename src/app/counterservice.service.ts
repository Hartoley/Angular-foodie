import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterserviceService {
  public num: BehaviorSubject <number> = new BehaviorSubject<number>(0)
  // private product: BehaviorSubject<[]> = new BehaviorSubject <Array>

  public counter:Observable<number> = this.num.asObservable()
  constructor() { }


  increase():void{
    this.num.next(this.num.value+1)
  }

  decrease():void{
    if (this.num.value>0) {
      this.num.next(this.num.value-1)
    }
  }
}
