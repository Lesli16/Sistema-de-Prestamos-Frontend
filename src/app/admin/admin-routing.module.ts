import { Routes, ExtraOptions, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { UserComponent } from '../pages/user/user.component';
import { TableComponent } from '../pages/table/table.component';
import { TypographyComponent } from '../pages/typography/typography.component';
import { IconsComponent } from '../pages/icons/icons.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import { UpgradeComponent } from '../pages/upgrade/upgrade.component';
import { AdminLayoutComponent } from './admin.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { LoanRequestsToApproveComponent } from './loan-requests-to-approve/loan-requests-to-approve.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'inicio', component: DashboardComponent },
      { path: 'equipos', component: EquipmentComponent },
      { path: 'aprobar-solicitudes', component: LoanRequestsToApproveComponent },
      { path: 'user', component: UserComponent },
      { path: 'table', component: TableComponent },
      { path: 'typography', component: TypographyComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'upgrade', component: UpgradeComponent },
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
