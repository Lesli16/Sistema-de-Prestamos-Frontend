import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/helpers/models/login-user';
import { AuthService } from 'src/helpers/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('registerForm', { read: NgForm }) form!: NgForm;

  loginUser: LoginUser = {} as LoginUser;
  submit: boolean = false;

  constructor(private authSrv: AuthService, private toastSrv: ToastrService, private router:Router) {}

  login(loginUser: LoginUser) {

    if (this.form.invalid) {

      this.toastSrv.error(
        'Llene todos los campos del formulario',
        'Revise la información',
        {
          positionClass: 'toast-top-center',
        }
      );
      this.submit = true;
      return;
    }

    this.authSrv.signIn(loginUser).subscribe({
      next: (data) => {
        this.toastSrv.success('Bienvenido a tu panel', '', {
          positionClass: 'toast-top-center',
        });
        if(data.response === 'ROLE_STUDENT' || data.response === 'ROLE_TEACHER'){
          this.router.navigateByUrl('/usuario')
        }else{
          this.router.navigateByUrl('/admin/inicio')
        }
      },
      error: (error) => {
        this.toastSrv.error(error.error.response,'Error' ,{
          positionClass: 'toast-top-center',
        });
        console.log(error);
      },
    });
  }
}
