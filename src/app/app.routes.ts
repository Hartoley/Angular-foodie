import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { userGuard } from './guards/user.guard';
import { NewtodoComponent } from './component/newtodo/newtodo.component';
import { OneUserComponent } from './component/one-user/one-user.component';
import { SwitchComponent } from './switch/switch.component';
import { FoodstoreComponent } from './component/foodstore/foodstore.component';
import { TestmodeComponent } from './material/testmode/testmode.component';
import { StdsignupComponent } from './students/stdsignup/stdsignup.component';
import { LogstudentComponent } from './students/logstudent/logstudent.component';
import { StddashComponent } from './students/stddash/stddash.component';
import { LandingComponent } from './component/landing/landing.component';



export const routes: Routes = [
    // {path: '', pathMatch:'full', redirectTo:'app'}, 
    {path:'todo', component:TodoComponent, canActivate:[userGuard]},
    {path:'home', component:HomeComponent},
    {path:'navbar', component:NavbarComponent},
    {path:'signup', component:SignupComponent},
    {path:'login', component:LoginComponent},
    {path:'wishlist',component:NewtodoComponent},
    {path:'switch', component:SwitchComponent},
    {path:'oneuser/:id', component:OneUserComponent},
    {path:'admindash', component:FoodstoreComponent},
    {path:'material', component:TestmodeComponent},
    {path:'usersignup', component:StdsignupComponent},
    {path:'usersignin', component:LogstudentComponent},
    { path: 'userdash', component: StddashComponent },
    {path:'', component:LandingComponent}


];
