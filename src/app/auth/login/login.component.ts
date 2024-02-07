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
  @ViewChild('forgotPasswordForm', { read: NgForm }) forgotPasswordForm!: NgForm;

  loginUser: LoginUser = {} as LoginUser;
  submit: boolean = false;

  forgotPasswordEmail: string = ''

  openDialog: boolean = false
  submitForgotPassword: boolean = false

  loading:boolean = false;
  successMessage:string ='';

  constructor(private authSrv: AuthService, private toastSrv: ToastrService, private router: Router) { }

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
        if (data.response === 'ROLE_STUDENT' || data.response === 'ROLE_TEACHER') {
          this.router.navigateByUrl('/usuario')
        } else {
          this.router.navigateByUrl('/admin/equipos')
        }
      },
      error: (error) => {
        this.toastSrv.error(error.error.response, 'Error', {
          positionClass: 'toast-top-center',
        });
        console.log(error);
      },
    });
  }

  openForgotPasswordDialog() {
    this.openDialog = true
  }

  sendForgotPasswordEmail(email:string) {
    if (this.forgotPasswordForm.invalid) {
      this.toastSrv.error(
        'El email es obligatorio', '', { positionClass: 'toast-top-center' });
      this.submitForgotPassword = true;
      return;
    }

   //if (!this.validateEmailDomain(email)) return;

   this.loading = true
    this,this.authSrv.sendForgotPasswordEmail(email).subscribe({
      next:data => {
        this.successMessage = data.response;
        this.loading = false
      },error:err =>{
        this.toastSrv.error(err.error.response,'',{
          positionClass: 'toast-top-center'
        })
        this.loading = false
      }
    })
  }

  validateEmailDomain(email: string): boolean {
    let regularExpression = /^[a-zA-Z0-9._%+-]+@espe\.edu\.ec$/;
    let result = regularExpression.test(email);
    if (!result) {
      this.toastSrv.error(
        'El correo debe tener el siguiente formato ejemplo@espe.edu.ec',
        'Email incorrecto',
        {
          positionClass: 'toast-top-center',
        }
      );
      return false;
    }
    return true;
  }

  closeModal(){
    this.openDialog = false
    this.successMessage = ''
  }
}
