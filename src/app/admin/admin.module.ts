import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent }       from '../pages/dashboard/dashboard.component';
import { UserComponent }            from '../pages/user/user.component';
import { TableComponent }           from '../pages/table/table.component';
import { TypographyComponent }      from '../pages/typography/typography.component';
import { IconsComponent }           from '../pages/icons/icons.component';
import { MapsComponent }            from '../pages/maps/maps.component';
import { NotificationsComponent }   from '../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AdminRoutingModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
  ]
})

export class AdminModule {}
