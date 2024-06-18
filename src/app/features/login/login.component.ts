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
      
      this.resultObj = JSON.parse(JSON.stringify(result)) as User[];

      var newObj = JSON.parse(JSON.stringify(result)) as User[];
      console.log("Users list Object " + this.resultObj);

      console.log("Current Username" + this.loginObj.Username);

      var currentUser = this.resultObj.filter((x:User) => x.EmailId === this.loginObj.Username);
      console.log("Current User : " + currentUser[0]);
      if(currentUser[0].Password === this.loginObj.Password)
        this.router.navigate(["home"]);
    });
    
  }
  private router = inject(Router);

  constructor(private http: HttpClient) {
    this.loginObj = { Username: '', Password: '' };
  }
}
