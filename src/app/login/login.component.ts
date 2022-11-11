import { Component, OnInit } from '@angular/core';
import { LoginManagerService } from '../login-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";

  constructor(public loginManager: LoginManagerService) { }

  ngOnInit(): void {
  }

  navigateToRegister() {

  }
}
