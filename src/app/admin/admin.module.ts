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
import { EquipmentComponent } from './equipment/equipment.component';
import { EquipmentClassificationComponent } from './equipment-classification/equipment-classification.component';
import { SharedModule } from '../shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';
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
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    EquipmentComponent,
    EquipmentClassificationComponent,
  ]
})

export class AdminModule {}
