import { Component, OnInit } from '@angular/core';
import { LoginManagerService } from '../login-manager.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = "";

  constructor(public loginManager: LoginManagerService) { }

  ngOnInit(): void {
  }

}
