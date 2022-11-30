import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Stat } from '../models/stat.model';
import { LoginManagerService } from './login-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private loginManager: LoginManagerService) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUserByCredentials(username: string, password: string, pin: number = 0): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users?username=${username}&password=${password}&pin=${pin}`);
  }

  createUser(data: User): Observable<any> {
    // DATA OBJECT MUST CONTAIN:
    // {
    //   username: string;
    //   realname: string;
    //   password: string;
    //   pin: number;
    //   height: number;
    //   weight: number;
    // }

    return this.http.post(`${this.baseUrl}/users`, data);
  }

  getAllStats(): Observable<Stat[]> {
    return this.http.get<Stat[]>(`${this.baseUrl}/stats?userGUID=${this.loginManager.user?._id}`); 
  }

  createStat(data: Stat): Observable<any> {
    // DATA OBJECT MUST CONTAIN:
    // {
    //   userGUID: string;
    //   workout: string;
    //   weight: number;
    //   createdAt: Date
    // }

    return this.http.post(`${this.baseUrl}/stats`, data)
  }

  deleteMyStats(): Observable<any> {
    return this.http.delete<Stat[]>(`${this.baseUrl}/stats?userGUID=${this.loginManager.user?._id}`);
  }

  deleteMyAccount(): Observable<any> {
    return this.http.delete<User[]>(`${this.baseUrl}/users?userGUID=${this.loginManager.user?._id}`);
  }
}