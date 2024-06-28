import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Signup } from '../models/signup.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent {
  private router = inject(Router);

  signupObj: Signup;

  constructor(private http: HttpClient){
    this.signupObj = { Name: '', email: '', password: '' };
  }

  onSignup(){
    console.log("Entered OnSingup");
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(this.signupObj);
    console.log(this.signupObj);
    var res = this.http.post('http://localhost:3000/users', body,{'headers':headers}).subscribe((result:any) => {
      this.router.navigate(["login"]);
      console.log(result);
    });
    console.log(res);
  }
}
