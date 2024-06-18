import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class FeaturesModule { }
