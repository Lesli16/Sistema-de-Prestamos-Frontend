import { Routes, ExtraOptions, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminLayoutComponent } from './admin.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { LoanRequestsToApproveComponent } from './loan-requests-to-approve/loan-requests-to-approve.component';
import { UsersLoanRequestHistoryComponent } from './users-loan-request-history/users-loan-request-history.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'perfil', component: AdminProfileComponent },
      { path: 'equipos', component: EquipmentComponent },
      { path: 'aprobar-solicitudes', component: LoanRequestsToApproveComponent },
      { path: 'historial-solicitudes', component: UsersLoanRequestHistoryComponent },
      {
        path: '**',
        redirectTo: 'equipos',
        pathMatch: 'full',
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
