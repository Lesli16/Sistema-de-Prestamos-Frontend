import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoanRequest } from 'src/helpers/models/loan-request';
import { LoanRequestService } from 'src/helpers/service/loan-request.service';

@Component({
  selector: 'app-loan-request-history',
  templateUrl: './loan-request-history.component.html',
  styleUrls: ['./loan-request-history.component.scss'],
})
export class LoanRequestHistoryComponent implements OnInit {
  loanRequest: LoanRequest[] = [];
  constructor(
    private loanRequestSrv: LoanRequestService,
    private toastSrv: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllUserLoanRequests();
  }

  getAllUserLoanRequests() {
    this.loanRequestSrv.getAllLoanRequestByUserName().subscribe({
      next: (data) => {
        console.log(data);
        this.loanRequest = data;
      },
    });
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case 'PENDIENTE':
        return 'warning';
      case 'APROBADO':
        return 'success';
      default:
        return 'danger';
    }
  }

  downLoadPdf(){
  }
}
