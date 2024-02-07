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
  constructor(private httpClient: HttpClient) { }

  createLoanRequest(loanRequest: LoanRequest) {
    return this.httpClient.post(`${this.apiUrl}/loan-request`, loanRequest, { withCredentials: true });
  }

  getAllLoanRequest(): Observable<LoanRequest[]> {
    return this.httpClient.get<LoanRequest[]>(`${this.apiUrl}/loan-request`, { withCredentials: true });
  }

  getAllLoanRequestByUserName(): Observable<LoanRequest[]> {
    return this.httpClient.get<LoanRequest[]>(`${this.apiUrl}/loan-request/all/by-username`, { withCredentials: true });
  }

  getAllPendingStatusLoanRequest(): Observable<LoanRequest[]> {
    return this.httpClient.get<LoanRequest[]>(`${this.apiUrl}/loan-request/status/pending`, { withCredentials: true });
  }

  approveOrDenyLoanRequest(loanRequestId: string, status: string): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/loan-request/approve-deny`, null, {
      withCredentials: true,
      params: {
        loanRequestId: loanRequestId,
        status: status
      }
    });
  }

  updateIfEquipmentsHasReturned(loanRequestId: string, status: boolean): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/loan-request/equipments-returned`, null, {
      withCredentials: true,
      params: {
        loanRequestId: loanRequestId,
        returned: status
      }
    });
  }

  downloadLoanRequestPdf(loanRequest: LoanRequest) {
    return this.httpClient.post(`${this.apiUrl}/pdf/loan-request`, loanRequest, {
      withCredentials: true,
      responseType:'blob'
     });
  }

}
