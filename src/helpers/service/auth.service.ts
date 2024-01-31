import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../models/login-user';
import { Observable } from 'rxjs';
import { RegisterUser } from '../models/register-user';

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
}
