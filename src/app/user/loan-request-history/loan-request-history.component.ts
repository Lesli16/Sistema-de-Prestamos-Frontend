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

  getLoanRequestStatusSeverity(loanStatus: boolean) {
    if (loanStatus === null) {
      return 'null'
    } else if (!loanStatus) {
      return 'success'
    } else {
      return 'warning'
    }
  }

  getLoanRequestStatus(loanStatus: boolean) {
    if (loanStatus === null) {
      return 'NO REGISTRA'
    } else if (!loanStatus) {
      return 'DEVUELTO'
    } else {
      return 'EN PRÉSTAMO'
    }
  }

  downLoadPdf(loanRequest:LoanRequest){
    this.loanRequestSrv.downloadLoanRequestPdf(loanRequest).subscribe({
      next: (data) =>{
        let newFile = new File([data], 'hola.pdf', {
          type: 'application/pdf',
        });
        let fileURL = URL.createObjectURL(newFile);
        window.open(fileURL, '_blank');
      }
    })
  }
}
