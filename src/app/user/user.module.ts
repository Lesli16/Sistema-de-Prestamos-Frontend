import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FixedPluginModule } from '../shared/fixedplugin/fixedplugin.module';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { FooterModule } from '../shared/footer/footer.module';
import { SidebarModule } from '../sidebar/sidebar.module';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FixedPluginModule,
    NavbarModule,
    FooterModule,
    SidebarModule
  ]
})
export class UserModule { }
