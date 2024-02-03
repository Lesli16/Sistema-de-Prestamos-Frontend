import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../models/login-user';
import { Observable } from 'rxjs';
import { RegisterUser } from '../models/register-user';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  signIn(loginUser: LoginUser): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/auth/login`, loginUser, {withCredentials:true});
  }

  signUp(newUser: RegisterUser): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/auth/register`, newUser);
  }

  getUserDetails():Observable<User>{
    return this.httpClient.get<User>(`${this.apiUrl}/auth/user-details`, {withCredentials:true});
  }
  logOut():Observable<any>{
    return this.httpClient.get(`${this.apiUrl}/auth/logout`, {withCredentials:true});
  }
}
