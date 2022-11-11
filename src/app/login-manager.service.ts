import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginManagerService {

  isLoggedIn: boolean = false;
  username: string | undefined = undefined;

  constructor() { }

  setLoggedIn(newStatus: boolean, newUsername: string = "") {
    this.isLoggedIn = newStatus;
    this.username = newUsername;
  }
}
