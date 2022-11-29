import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginManagerService {

  user: User | undefined = undefined;

  constructor() { }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }
}
