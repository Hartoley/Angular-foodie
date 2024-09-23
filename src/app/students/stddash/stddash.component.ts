import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../../component/footer/footer.component';
import { TotestComponent } from '../../component/totest/totest.component';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-stddash',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FooterComponent, TotestComponent, HomeComponent],
  templateUrl: './stddash.component.html',
  styleUrl: './stddash.component.css'
})
export class StddashComponent {
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
 
 

  ngOnInit(){
    this.token = localStorage.getItem('The token');
    this.email = localStorage.getItem('The email');
    this.id = localStorage.getItem('The id')
  
    
    
    if (!this.token) {
      this.router.navigate(['studentsignin'])
    }else{
      this.http.get('http://localhost/php/admin/display.php').subscribe((Allproducts:any)=>{
        this.fetchedProducts = Allproducts.map((i:any)=>({
          ...i,
          addedToCart: false,
          quantity: 0,
        }))
      
      })


    }

 
    const Id = this.id

    this.http.post("http://localhost/php/students/displaycart.php", { Id }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).subscribe((response: any) => {
      // console.log(Id);
      
      console.log('Id sent successfully', response);
      this.cart = response.data
      let totalPrice = 0;

    
      for (const item of this.cart) {
       
        const productTotal = item.product_price * item.quantity;
      
        totalPrice += productTotal;
      }
  
     
      this.total = totalPrice;
      console.log('Total price:', this.total);
      console.log(this.cart);
      
    }, error => {
      console.error('Error sending Id', error);
    });

    // this.http.get('http://localhost/php/students/displaycart.php?user_id=${Id}').subscribe((cart: any)=>{
    //   console.log(cart);
    //   this.cart = cart
      
      
    // })

   
  
 
  }


  addTOCart(i: any, index: number) {
    if (!Array.isArray(this.cart)) {
    
      this.cart = [];
    }
    
    const itemInCart = this.cart.find((item: any) => item.id === i.id);
  
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      i.quantity = 1;
      i.addedToCart = true;
      this.cart.push(i);
    }

    const dataToSend = {
      product_id : i.id,
      product_name: i.product_name,
      product_price: i.product_price,
      quantity: i.quantity,
      user_id: this.id,
    };
    console.log(dataToSend);
    
    this.http.post("http://localhost/php/students/cart.php", dataToSend, {
      headers: {
        "Content-Type": "application/json"
      }
    }).subscribe((response: any) => {
      this.message = response.message;
      this.selectedIndex = index; 
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
      console.log(this.cart);
      
      
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
      this.message = response.message;
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

  makepayment(){
    const dataToSend = {
      Id: this.id,
      total: this.total,
      email:this.email
      
    };

    this.http.post("http://localhost/php/students/payment.php", dataToSend, {
      headers: {
        "Content-Type": "application/json"
      }
    }).subscribe((response: any) => {
      console.log(response);
      if (response) {
        window.open(response)

      }

    });


      this.http.post("http://localhost/php/students/clearCart.php", dataToSend, {
        headers: {
          "Content-Type": "application/json"
        }
      }).subscribe((response: any) => {
        console.log(response);
  
      });

  }

  signout() {
    localStorage.removeItem('The token');
    localStorage.removeItem('The email');
    localStorage.removeItem('The id');
    localStorage.removeItem('currentUser');
  
    alert('You have successfully logged out.');
  
    this.router.navigate(['studentsignin'])  
  }

}
