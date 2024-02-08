import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AdminRoleGuard implements CanActivate {
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private toastService: ToastrService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authSrv.getUserDetails().pipe(
      take(1),
      map((data) => {
        return !!(data.role.roleName === 'ROLE_ADMIN');
      }),
      tap((estado) => {
        if (!estado) {
          this.toastService.warning('No autorizado', '', {
            positionClass: 'toast-top-center'
          });
          this.router.navigateByUrl('/usuario/');
        }
      })
    );
  }
}
