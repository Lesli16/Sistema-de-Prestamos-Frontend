import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordDto } from 'src/helpers/models/user';
import { AuthService } from 'src/helpers/service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('restorePasswordForm', { read: NgForm }) restorePasswordForm!: NgForm;

  newPassword: string = ''
  confirmNewPassword: string = ''
  submit: boolean = false
  constructor(
    private authSrv: AuthService,
    private toastSrv: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verifyToken()
  }

  verifyToken() {
    console.log("hola")
    this.authSrv.verifyToken(this.activatedRoute.snapshot.params['token']).subscribe(res => {
      if (!res) {
        this.toastSrv.error('Enlace caducado, por favor vuelve a solicitar un nuevo enlace', 'Error', {
          positionClass: 'toast-top-center'
        })
        this.router.navigateByUrl('/auth')
      }
    })
  }

  restorePassword() {
    if (this.restorePasswordForm.invalid) {
      this.toastSrv.error(
        'Por favor llene todo los campos', '', { positionClass: 'toast-top-center' });
      this.submit = true;
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      this.toastSrv.error(
        'Las contraseñas no coinciden', '', { positionClass: 'toast-top-center' });
      this.submit = true;
      return;
    } else {
      let token = this.activatedRoute.snapshot.params['token'];
      let forgotPasswordDto: ForgotPasswordDto = {
        newPassword: this.newPassword,
        resetPasswordToken: token
      }

      this.authSrv.resetUserPassword(forgotPasswordDto).subscribe({
        next: data => {
          this.toastSrv.success('Para continuar, inicie sesión', data.response, {
            positionClass: 'toast-top-center'
          })
          this.router.navigateByUrl('/auth/login')
        }, error: err => {
          this.toastSrv.error(err.error.response, 'Algo salió mal', {
            positionClass: 'toast-top-center'
          })
        }
      })
    }
  }
}
