import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FixedPluginModule } from '../shared/fixedplugin/fixedplugin.module';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { FooterModule } from '../shared/footer/footer.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { SharedModule } from '../shared/shared.module';
import { LoanRequestComponent } from './loan-request/loan-request.component';

@NgModule({
  declarations: [
    UserComponent,
    EquipmentListComponent,
    LoanRequestComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FixedPluginModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    SharedModule
  ]
})
export class UserModule { }
