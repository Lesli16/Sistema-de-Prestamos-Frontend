import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  service_count = 0;

  constructor(
    private toastSrv: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.service_count++;
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403 || err.status === 401) {
          this.authService.logOutInterceptor();
          this.toastSrv.info('','Sesión expirada',{
            positionClass: 'toast-top-center'
          })
          return throwError(() => err);
        } else {
          return throwError(() => err);
        }
      }),
      finalize(() => {
        this.service_count--;
      })
    );
  }
}

export const InterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
];
