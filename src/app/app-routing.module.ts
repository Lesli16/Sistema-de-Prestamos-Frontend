import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin/admin.component';

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  /*   {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./layouts/admin-layout/admin.module').then(
            (x) => x.AdminLayoutModule
          ),
      },
    ],
  }, */
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
