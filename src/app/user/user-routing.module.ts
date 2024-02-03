import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { LoanRequestComponent } from './loan-request/loan-request.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'lista-equipos', pathMatch: 'full' },
      { path: 'lista-equipos', component: EquipmentListComponent },
      { path: 'solicitud-prestamo', component: LoanRequestComponent },
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
