import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../../component/footer/footer.component';
import { TotestComponent } from '../../component/totest/totest.component';
import { HomeComponent } from '../../home/home.component';
import { LandingHeaderComponent } from '../landing-header/landing-header.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FooterComponent, TotestComponent, HomeComponent, LandingHeaderComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(public router: Router, public http: HttpClient){}
  public date = new Date().getDay();
  public toDelete:any = [];
  public newQ: Number = 1;
  public userinfo:any;
  public prices:any;
  public qty:any;
  public total:any;
  public productss:any;
  public productItems: any = [];
  isVisible: boolean = false ;
  public cart: any = []
  public token:any;
  public email:any;
  public id:any;
  public selectedIndex:any;
  productsList: any[] = [];
  products:any={
    product_name:"",
    product_price:"",
    product_category:"",
    product_description:"",
    in_stock:"",
    profile:null
  }
  message: string = '';
  public fetchedProducts:any;
  public paymentSuccessful:Boolean =false
 
 

  ngOnInit() {
      this.http.get('http://localhost/php/admin/display.php').subscribe((Allproducts: any) => {
        this.fetchedProducts = Allproducts.map((i: any) => ({
          ...i,
          addedToCart: false,
          quantity: 0,
        }))
      
      })

  }

    toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

 

}
