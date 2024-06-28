import { Component, inject } from '@angular/core';
import { Login } from '../models/login.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: Login;
  resultObj: User[] = [];
  onLogin() {
    const headers = { 'content-type': 'application/json'}
    var res = this.http.get('http://localhost:3000/users', {'headers':headers}).subscribe((result:any) => {
      console.log(result);
      this.resultObj = JSON.parse(JSON.stringify(result)) as User[];
      var currentUser = this.resultObj.filter((x:User) => x.email === this.loginObj.email);
      if(currentUser[0].password === this.loginObj.password){
        sessionStorage.setItem("loggedInUserId", currentUser[0].id);
        this.router.navigate(["home"]);
      }
      else{
        alert("Incorrect Credentials!");
      }
        
    });
    
  }
  private router = inject(Router);

  constructor(private http: HttpClient) {
    this.loginObj = { email: '', password: '' };
  }
}
