import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin/admin.component';
import { AdminRoleGuard } from 'src/helpers/guards/admin-role.guard';
import { UserRoleGuard } from 'src/helpers/guards/user-role.guard';

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    canActivate: [AdminRoleGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'usuario',
    canActivate: [UserRoleGuard],
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
