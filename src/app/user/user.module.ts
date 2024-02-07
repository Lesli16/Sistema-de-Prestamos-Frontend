import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { SharedModule } from '../shared/shared.module';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { LoanRequestHistoryComponent } from './loan-request-history/loan-request-history.component';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';

@NgModule({
  declarations: [
    UserComponent,
    EquipmentListComponent,
    LoanRequestComponent,
    LoanRequestHistoryComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NavbarModule,
    SidebarModule,
    SharedModule
  ]
})
export class UserModule { }
