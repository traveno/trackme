import { Component, OnInit } from '@angular/core';
import { LoginManagerService } from '../login-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginManager: LoginManagerService) { }

  ngOnInit(): void {
  }

}
