import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-foodstore',
  standalone: true,
  imports: [CommonModule,NavbarComponent, HttpClientModule, FormsModule],
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
  public updating: Boolean =false;
  public email: any;
  public index:any;
  public udatedProduct: any ={
    product_name: "",
    product_price: "",
    product_category: "",
    product_description: "",
    in_stock: "",
    product_img: null 
  };
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
      // this.http.get('https://dummyjson.com/products').subscribe((productInfo: any) => {
      //   console.log(productInfo);
      //   this.productss = productInfo.products;
      //   this.productss.forEach((item: any) => {
      //     this.productItems.push(item);
      //   });
      // });
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
            location.reload()

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
      if (this.updating) {
        this.udatedProduct.product_img = file;
      } else {
        this.products.product_img = file;
      }
    }
  }
  

  edit(product: any) {
    this.updating = true;
    this.udatedProduct = { ...product }; 
  }

  cancelUpdate() {
    this.updating = false;
    this.udatedProduct = {
      product_name: "",
      product_price: "",
      product_category: "",
      product_description: "",
      in_stock: "",
      product_img: null
    };
  
  }

  
 
  updateProduct(i:any) {
    if (!this.udatedProduct.id) {
      console.error('Product ID is missing');
      return;
    }
  
    const formData = new FormData();
    formData.append('id', this.udatedProduct.id);
    formData.append('product_name', this.udatedProduct.product_name);
    formData.append('product_price', this.udatedProduct.product_price);
    formData.append('product_category', this.udatedProduct.product_category);
    formData.append('product_description', this.udatedProduct.product_description);
    formData.append('in_stock', this.udatedProduct.in_stock);
  
    if (this.udatedProduct.product_img) {
      formData.append('product_img', this.udatedProduct.product_img);
    }

    if (!Array.isArray(this.fetchedProducts)) {
      console.error('Fetched Products is not an array');
      return;
    }
    
    if (!this.udatedProduct || !this.udatedProduct.id) {
      console.error('Updated Product or Product ID is missing');
      return;
    }
    
    console.log('Fetched Products:', this.fetchedProducts);
    console.log('Updated Product:', this.udatedProduct);
  
    this.http.post("http://localhost/php/admin/editProduct.php", formData)
      .subscribe({
        next: (response: any) => {
          if (response.message === 'Product updated successfully') {
            alert('Product updated successfully');
            this.updating = false;
            location.reload()

            // this.fetchedProducts = this.fetchedProducts.map(product =>
            //   product.id === this.udatedProduct.id ? this.udatedProduct : product
            // );
          } else {
            alert(response.message);
          }
        },
        error: (error) => {
          console.error('Error updating product', error);
          alert('Error updating product');
        }
      });
  }
  
  
  delete(i: any) {
    const itemInCart = this.fetchedProducts.find((item: any) => item.id === i.id);
  
    if (!itemInCart) {
      console.error('Product not found');
      return;
    }
  
    this.http.post("http://localhost/php/admin/deleteProduct.php", { items: itemInCart.id }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).subscribe((response: any) => {
      if (response.message === 'Product deleted successfully') {
        alert('Item deleted successfully');
        console.log('Item deleted successfully', response);
        
        this.fetchedProducts = this.fetchedProducts.filter((item: any) => item.id !== itemInCart.id);
      } else {
        console.error('Error:', response.message);
        alert(response.message);
      }
    }, error => {
      console.error('Error deleting product', error);
    });
  }
  

}
