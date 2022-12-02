import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoginManagerService } from '../services/login-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  pin!: number;

  errorMessage: string = '';

  constructor(public loginManager: LoginManagerService, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  
  login() {
    if (this.loginManager.isLoggedIn()) {
      console.error('Attempted to log in when we are already logged in...');
      return;
    }

    this.loginManager.attemptLogin({
      username: this.username,
      password: this.password,
      pin: this.pin
    });
   
  }
}
