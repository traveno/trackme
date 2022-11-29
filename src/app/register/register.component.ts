import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoginManagerService } from '../login-manager.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  password: string = '';
  pin!: number;
  realname: string = '';
  height: number = 0;
  weight: number = 0;

  errorMessage: string = '';

  constructor(public loginManager: LoginManagerService, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.api.createUser({
      username: this.username,
      password: this.password,
      pin: this.pin,
      realname: this.realname,
      height: this.height,
      weight: this.weight
    }).subscribe(result => {
      this.loginManager.user = result;
      this.router.navigateByUrl('/home');
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

}
