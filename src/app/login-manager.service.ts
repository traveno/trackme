import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginManagerService {

  isLoggedIn: boolean = false;

  constructor() { }
  

  setLoggedIn(newStatus: boolean) {
    this.isLoggedIn = newStatus;
  }
}
