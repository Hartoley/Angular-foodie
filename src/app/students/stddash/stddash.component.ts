import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stddash',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './stddash.component.html',
  styleUrl: './stddash.component.css'
})
export class StddashComponent {
  constructor(public router: Router, public http: HttpClient){}
  public date = new Date().getDay();
  public toDelete:any = [];
  public newQ: Number = 1;
  public userinfo:any;
  public productss:any;
  public productItems: any = [];
  isVisible: boolean = false ;
  public cart: any = []
  public token:any;
  public email:any;
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
 
 

  ngOnInit(){
    this.token = localStorage.getItem('The token');
    this.email = localStorage.getItem('The email')
    if (!this.token) {
      this.router.navigate(['login'])
    }else{
      // console.log('Token retrieved:', this.token);
      this.http.get('http://localhost/php/admin/display.php').subscribe((Allproducts:any)=>{
        // console.log(Allproducts);
        this.fetchedProducts = Allproducts.map((i:any)=>({
          ...i,
          addedToCart: false,
          quantity: 0,
        }))
        // console.log(this.fetchedProducts);
      
      })

  
 
      this.http.get('https://dummyjson.com/products').subscribe((productInfo: any)=>{
        console.log(productInfo);
        this.productss = productInfo.products
        this.productss.forEach((item:any)=>{
        this.productItems.push(item)
        })
      })
    }

    this.http.get('http://localhost/php/students/displaycart.php').subscribe((cart: any)=>{
      // console.log(cart);
      this.cart = cart
      
    })
  
 
  }

  addTOCart(i: any) {
    const itemInCart = this.cart.find((item: any) => item.id === i.id);
  
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      i.quantity = 1;
      i.addedToCart = true;
      this.cart.push(i);
    }
    // console.log('Updated item:', i);
    // console.log('Current cart:', this.cart);
    const dataToSend = {
      product_name: i.product_name,
      product_price: i.product_price,
      quantity: i.quantity
    };
    // alert(`${i.product_name} added to cart`);
    console.log(dataToSend);
    
    this.http.post("http://localhost/php/students/cart.php", dataToSend, {
      headers: {
        "Content-Type": "application/json"
      }
    }).subscribe((response: any) => {
      
      console.log('Cart updated successfully', response);
    }, error => {
      console.error('Error updating cart', error);
    });
  }
  
  
  increase(item: any) {
    if (item.quantity) {
      this.newQ = Number(item.quantity) + 1;
      item.quantity = this.newQ;
    } else {
      item.quantity = 1;
    }

    const cartItem = this.cart.find((cartItem: any) => cartItem.id === item.id);
    if (cartItem) {
      cartItem.quantity = item.quantity;
    } else {
      this.cart.push(item);
      
    }
    console.log('Cart after increase:', this.cart);
    this.http.post("http://localhost/php/students/addtocart.php", { items: this.cart }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).subscribe((response: any) => {
      alert('Cart updated successfully')
      console.log('Cart updated successfully', response);
    }, error => {
      console.error('Error updating cart', error);
    });
  }
  

  decrease(item:any) {
    if (item.quantity) {
      this.newQ = Number(item.quantity) - 1;
      item.quantity = this.newQ;
    } else {
      item.quantity = 1;
    }

    const cartItem = this.cart.find((cartItem: any) => cartItem.id === item.id);
    if (cartItem) {
      cartItem.quantity = item.quantity;
    } else {
      this.cart.push(item);
      
    }
    this.http.post("http://localhost/php/students/decreas.php", { items: this.cart }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).subscribe((response: any) => {
      alert('Cart updated successfully')
      console.log('Cart updated successfully', response);
    }, error => {
      console.error('Error updating cart', error);
    });
    
  }

  onDelete(item: any){
    const cartItem = this.cart.find((cartItem: any) => cartItem.id === item.id);
    console.log(cartItem);
    this.toDelete.push(cartItem)
    console.log(this.toDelete);
    this.http.post("http://localhost/php/students/delete.php", { items: this.toDelete }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).subscribe((response: any) => {
      alert('Item deleted successfully')
      console.log('Item deleted successfully', response);
    }, error => {
      console.error('Error updating cart', error);
    });
  }


onProduct(){
  this.http.post("http://localhost/php/admin/createproduct.php", this.products,{
    headers:{
      "Content-Type":"application/json"
    }
  })
  .subscribe((response:any)=>{
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
        product_img:null
      };
    } else {
      this.message = 'Unexpected response from server.';
    }
  },
  (error)=>{
    console.log(error);
    this.message = 'Error occurred during registration.';
  }
)
}

onFileChange(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    this.products.product_img = reader.result;
  };
  reader.readAsDataURL(file);
}




  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  

}
