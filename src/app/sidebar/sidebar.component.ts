import { User } from './../../helpers/models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/helpers/service/auth.service';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES_ADMIN: RouteInfo[] = [
  { path: '/admin/inicio', title: 'Dashboard', icon: 'nc-bank', class: '' },
  { path: '/admin/equipos', title: 'Equipos', icon: 'nc-bullet-list-67', class: '' },
  { path: '/admin/aprobar-solicitudes', title: 'Aprobar solicitudes', icon: 'nc-tap-01', class: '' },
  { path: '/admin/historial-solicitudes', title: 'Historial y Devoluciones', icon: 'nc-diamond', class: '' },

  { path: '/admin/icons', title: 'Icons', icon: 'nc-diamond', class: '' },
  {
    path: '/admin/notifications',
    title: 'Notifications',
    icon: 'nc-bell-55',
    class: '',
  },
  {
    path: '/admin/user',
    title: 'User Profile',
    icon: 'nc-single-02',
    class: '',
  },
  { path: '/admin/table', title: 'Table List', icon: 'nc-tile-56', class: '' },
  {
    path: '/admin/typography',
    title: 'Typography',
    icon: 'nc-caps-small',
    class: '',
  },
  {
    path: '/auth/login',
    title: 'Cerrar sesión',
    icon: 'nc-button-power',
    class: 'active-pro',
  },
];

export const ROUTES_STUDENT_TEACHER: RouteInfo[] = [
  {
    path: '/usuario/lista-equipos',
    title: 'Equipos',
    icon: 'nc-bullet-list-67',
    class: '',
  },
  {
    path: '/usuario/historial-prestamos',
    title: 'Historial Préstamos',
    icon: 'nc-book-bookmark',
    class: '',
  },
  {
    path: '/auth/login',
    title: 'Cerrar sesión',
    icon: 'nc-button-power',
    class: 'active-pro',
  }
];
@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public menuItems: any[] = [];
  userCharge:string = ''

  constructor(private authSrv: AuthService, private toastSrv: ToastrService, private router: Router) { }

  ngOnInit() {
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.getUserDetails();
  }

  getUserDetails() {
    this.authSrv.getUserDetails().subscribe({
      next: (user: User) => {
        if (user.role.roleName === 'ROLE_STUDENT' || user.role.roleName === 'ROLE_TEACHER') {
          this.menuItems = ROUTES_STUDENT_TEACHER.filter(
            (menuItem) => menuItem
          );
        } else {
          this.menuItems = ROUTES_ADMIN.filter((menuItem) => menuItem);
        }
        this.userCharge = this.getUserRole(user.role.roleName)
      },
    });
  }

  logOut() {
    this.authSrv.logOut().subscribe({
      next: (data) => {
        this.toastSrv.success(data.response, '', {
          positionClass: 'toast-top-center',
        });
        this.router.navigateByUrl('/auth/login')
      },
    });
  }

  getUserRole(role: string) {
    switch (role) {
      case 'ROLE_STUDENT':
        return 'Estudiante'
      case 'ROLE_TEACHER':
        return 'Docente'
      default:
        return 'Admin';
    }
  }
}
