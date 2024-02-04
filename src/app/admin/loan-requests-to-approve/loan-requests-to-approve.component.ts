import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoanRequest } from 'src/helpers/models/loan-request';
import { LoanRequestService } from 'src/helpers/service/loan-request.service';

@Component({
  selector: 'app-loan-requests-to-approve',
  templateUrl: './loan-requests-to-approve.component.html',
  styleUrls: ['./loan-requests-to-approve.component.scss']
})
export class LoanRequestsToApproveComponent implements OnInit{

  loanRequest:LoanRequest[] = []

  constructor(
    private loanRequestSrv: LoanRequestService,
    private toastSrv: ToastrService
  ) {}


  ngOnInit(): void {
    this.getAllLoanRequestToApprove()
  }

  getAllLoanRequestToApprove(){
    this.loanRequestSrv.getAllPendingStatusLoanRequest().subscribe({
      next:data=> this.loanRequest = data
    })
  }

  getUserCharge(role:string){
    return role === 'ROLE_STUDENT' ?'Estudiante' :'Docente'
  }

  approveOrDenyLoanRequest(loanRequestId: string, status: string) {
    this.loanRequestSrv.approveOrDenyLoanRequest(loanRequestId, status).subscribe({
      next: data => {
        this.toastSrv.success(data.response, '', {
          positionClass: 'toast-top-center',
        });
        this.getAllLoanRequestToApprove()
      }, error: err => {
        this.toastSrv.error(err.error.response, '', {
          positionClass: 'toast-top-center',
        });
      }
    })
  }
}
