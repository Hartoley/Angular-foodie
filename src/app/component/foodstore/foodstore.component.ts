import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foodstore',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './foodstore.component.html',
  styleUrls: ['./foodstore.component.css']
})
export class FoodstoreComponent {
  constructor(public router: Router, public http: HttpClient) {}

  public date = new Date().getDay();
  public userinfo: any;
  public productss: any;
  public productItems: any = [];
  public token: any;
  public email: any;
  productsList: any[] = [];
  products: any = {
    product_name: "",
    product_price: "",
    product_category: "",
    product_description: "",
    in_stock: "",
    product_img: null 
  };
  message: string = '';
  public fetchedProducts: any;

  ngOnInit() {
    this.token = localStorage.getItem('The token');
    this.email = localStorage.getItem('The email');
    if (!this.token) {
      this.router.navigate(['login']);
    } else {
      console.log('Token retrieved:', this.token);
      this.http.get('http://localhost/php/admin/display.php').subscribe((Allproducts: any) => {
        console.log(Allproducts);
        this.fetchedProducts = Allproducts;
        console.log(this.fetchedProducts);
        
      });
      console.log(this.email);
      this.http.get('https://dummyjson.com/products').subscribe((productInfo: any) => {
        console.log(productInfo);
        this.productss = productInfo.products;
        this.productss.forEach((item: any) => {
          this.productItems.push(item);
        });
      });
    }
  }

  onProduct() {
    const formData = new FormData();

    formData.append('product_name', this.products.product_name);
    formData.append('product_price', this.products.product_price);
    formData.append('product_category', this.products.product_category);
    formData.append('product_description', this.products.product_description);
    formData.append('in_stock', this.products.in_stock);

    if (this.products.product_img) {
      formData.append('product_img', this.products.product_img);
    }

    this.http.post("http://localhost/php/admin/createproduct.php", formData)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          if (response && response.success) {
            this.message = response.message;
            this.productsList.push({ ...this.products });
            this.products = {
              product_name: "",
              product_price: "",
              product_category: "",
              product_description: "",
              in_stock: "",
              product_img: null
            };
            this.message = 'Product uploaded successfully.';
          } else {
            this.message = 'Unexpected response from server.';
          }
        },
        error: (error) => {
          console.log(error);
          this.message = 'Error occurred during registration.';
        }
      });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.products.product_img = file; 
    }
  }
}
