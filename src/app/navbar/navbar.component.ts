import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoginManagerService } from '../login-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginManager: LoginManagerService, private api: ApiService) { }

  ngOnInit(): void {
  }


  deleteMyStats() {
    this.api.deleteMyStats(this.loginManager.user?._id!).subscribe(results => {
      console.log('Deleted', results);
    })
  }

}
