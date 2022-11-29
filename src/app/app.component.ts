import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginManagerService } from './login-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trackme';

  constructor(private loginManager: LoginManagerService, router: Router) {
    if (!this.loginManager.isLoggedIn())
      router.navigate(['login']);
  }
}
