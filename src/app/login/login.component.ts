import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoginManagerService } from '../login-manager.service';

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

  navigateToRegister() {

  }
  
  login() {
    this.api.getUserByCredentials(this.username, this.password, this.pin).subscribe(result => {
      this.loginManager.user = result;
      this.router.navigateByUrl('/home');
    }, error => {
      this.errorMessage = error.error.message;
    })
  }
}
