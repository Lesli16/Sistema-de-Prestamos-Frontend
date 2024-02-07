import { Router } from '@angular/router';
import { routes } from '../../app-routing.module';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/helpers/models/user';
import { AuthService } from 'src/helpers/service/auth.service';
import { UserService } from 'src/helpers/service/user.service';

@Component({
  selector: 'user-cmp',
  moduleId: module.id,
  templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {

  newPassword: string = ''
  confirmNewPassword: string = ''
  submit: boolean = false
  user: User = {} as User
  newUserName: string = ''
  constructor(private userSrv: UserService, private toastSrv: ToastrService,
    private authSrv: AuthService, private router: Router) { }

  ngOnInit() {
    this.getUserInfo()
  }

  getUserInfo() {
    this.authSrv.getUserDetails().subscribe({
      next: data => {
        this.user = data
        this.newUserName = data.userName
      }
    })
  }

  updateUserInfo(user: User) {
    console.log(this.newUserName)
    console.log(this.user.userName)
    if (this.newUserName !== user.userName) {
      user.userName = this.newUserName;
      this.userSrv.updateUserInfo(user).subscribe({
        next: () => { }
      })
      this.authSrv.logOut().subscribe({
        next: () => {
          this.toastSrv.success('Se requiere volver a iniciar sesión', 'Datos actualizados', {
            positionClass: 'toast-top-center'
          })
          this.router.navigateByUrl('/auth/login');
        }
      })
    } else {
      this.userSrv.updateUserInfo(user).subscribe({
        next: data => this.toastSrv.success(data.response, '', {
          positionClass: 'toast-top-center'
        })
      })
    }
  }

  changePassword() {
    if (this.newPassword !== this.confirmNewPassword) {
      this.toastSrv.error(
        'Las contraseñas no coinciden', '', { positionClass: 'toast-top-center' });
      this.submit = true;
      return;
    } else {
      this.userSrv.changeUserPassword(this.newPassword).subscribe({
        next: data => {
          this.toastSrv.success(data.response, '', {
            positionClass: 'toast-top-center'
          })
        }
      })
    }
  }
}
