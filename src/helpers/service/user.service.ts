import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  updateUserInfo(user:User): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/user`, user, {withCredentials:true});
  }

  changeUserPassword(newPassword:string): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/user/change-password`, null, {
      withCredentials:true,
      params:{
        newPassword: newPassword
      }
    });
  }
}
