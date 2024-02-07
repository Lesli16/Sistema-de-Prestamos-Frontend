import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'primeng/fileupload';
import { SharedModule } from '../shared/shared.module';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { EquipmentClassificationComponent } from './equipment-classification/equipment-classification.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { LoanRequestsToApproveComponent } from './loan-requests-to-approve/loan-requests-to-approve.component';
import { UsersLoanRequestHistoryComponent } from './users-loan-request-history/users-loan-request-history.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AdminRoutingModule,
    SharedModule,
    FileUploadModule
  ],
  declarations: [
    UserComponent,
    EquipmentComponent,
    EquipmentClassificationComponent,
    LoanRequestsToApproveComponent,
    UsersLoanRequestHistoryComponent,
    AdminProfileComponent,
  ]
})

export class AdminModule {}
