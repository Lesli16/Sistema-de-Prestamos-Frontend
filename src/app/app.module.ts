import { InterceptorProvider, InterceptorService } from './../helpers/service/interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { NavbarModule } from './shared/navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AppRoutingModule } from "./app-routing.module";
import { AdminLayoutComponent } from './admin/admin.component';
import {HttpClientModule} from '@angular/common/http';
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    SharedModule
  ],
  providers: [InterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
