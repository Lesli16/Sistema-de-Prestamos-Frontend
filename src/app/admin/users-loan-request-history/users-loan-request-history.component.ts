import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoanRequest } from 'src/helpers/models/loan-request';
import { LoanRequestService } from 'src/helpers/service/loan-request.service';

@Component({
  selector: 'app-users-loan-request-history',
  templateUrl: './users-loan-request-history.component.html',
  styleUrls: ['./users-loan-request-history.component.scss']
})
export class UsersLoanRequestHistoryComponent implements OnInit {

  loanRequest: LoanRequest[] = []

  constructor(
    private toastSrv: ToastrService,
    private loanRequestSrv: LoanRequestService
  ) { }

  ngOnInit(): void {
    this.getAllLoanRequests()
  }

  getAllLoanRequests() {
    this.loanRequestSrv.getAllLoanRequest().subscribe({
      next: (data) => this.loanRequest = data,
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

  getLoanRequestStatus(loanStatus: boolean) {
    if (loanStatus === null) {
      return 'NO REGISTRA'
    } else if (!loanStatus) {
      return 'DEVUELTO'
    } else {
      return 'EN PRÉSTAMO'
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

  getUserCharge(role: string) {
    return role === 'ROLE_STUDENT' ? 'Estudiante' : 'Docente'
  }

  markAsReturned(loanRequestId: string, returned: boolean) {
    if (returned) {
      this.loanRequestSrv.updateIfEquipmentsHasReturned(loanRequestId, returned).subscribe({
        next: data => {
          this.toastSrv.success(data.response, '', {
            positionClass: 'toast-top-center'
          })
          this.getAllLoanRequests()
        }

      })
    }
  }
}
