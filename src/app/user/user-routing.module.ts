import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { LoanRequestHistoryComponent } from './loan-request-history/loan-request-history.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'lista-equipos', pathMatch: 'full' },
      { path: 'lista-equipos', component: EquipmentListComponent },
      { path: 'solicitud-prestamo', component: LoanRequestComponent },
      { path: 'historial-prestamos', component: LoanRequestHistoryComponent },
      {
        path: '**',
        redirectTo: 'lista-equipos',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
