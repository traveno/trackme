import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginManagerService {

  user: User | undefined = undefined;

  // Status text for login/register failure so that user can see
  // what is going on
  statusText = '';

  constructor(private api: ApiService, private router: Router) { }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  async attemptLogin(data: any) {
    this.api.getUserByCredentials(data.username, data.password, data.pin).subscribe(resultUser => {
      // If we got a result, then we matched a user with these credentials
      this.setLocalUser(resultUser);
      this.statusText = '';
      // Navigate to homepage, we have successfully logged in
      this.router.navigateByUrl('/home');
    }, error => {
      // We could not find a user
      if (error.message.includes('Unknown Error')) {
        this.statusText = 'Unknown error, check console. Is the backend service running?';
        return;
      }

      this.statusText = error.error.message ?? error.message;
    });
  }

  async attemptRegister(data: any) {
    this.api.createUser(data).subscribe(resultUser => {
      // If we got a result, then we successfully registered a new account
      this.setLocalUser(resultUser);
      this.statusText = '';
      this.router.navigateByUrl('/home');
    }, error => {
      // We could not register
      if (error.message.includes('Unknown Error')) {
        this.statusText = 'Unknown error, check console. Is the backend service running?';
        return;
      }
      
      this.statusText = error.error.message;
    });
  }

  // Sets the application's logged in user
  setLocalUser(newUser: User) {
    this.user = newUser;
  }
}
