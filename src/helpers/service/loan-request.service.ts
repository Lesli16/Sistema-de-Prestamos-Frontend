import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoanRequest } from '../models/loan-request';

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  createLoanRequest(loanRequest:LoanRequest){
    return this.httpClient.post(`${this.apiUrl}/loan-request`, loanRequest, {withCredentials:true});
  }

  getAllLoanRequest():Observable<LoanRequest[]>{
    return this.httpClient.get<LoanRequest[]>(`${this.apiUrl}/loan-request`, {withCredentials:true});
  }
}
