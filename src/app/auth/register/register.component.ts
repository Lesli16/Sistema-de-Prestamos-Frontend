import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterUser } from 'src/helpers/models/register-user';
import { AuthService } from 'src/helpers/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @ViewChild('registerForm', { read: NgForm }) form!: NgForm;

  newUser: RegisterUser = {} as RegisterUser;
  submit: boolean = false;
  selectedRole: any = '';
  roles = [
    { value: 'student', description: 'Estudiante' },
    { value: 'teacher', description: 'Docente' },
  ];

  constructor(
    private authSrv: AuthService,
    private toastSrv: ToastrService,
    private router: Router
  ) {}

  handleSignup(newUser: RegisterUser) {
    newUser.role = this.selectedRole.value;
    console.log(newUser);
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

    if (!this.validateEmailDomain(newUser.email)) return;

    this.authSrv.signUp(newUser).subscribe({
      next: (data) => {
        this.toastSrv.success(data.response, 'Registro exitoso!', {
          positionClass: 'toast-top-center',
        });
        this.router.navigateByUrl('/auth/login');
      },
      error: (error) => {
        this.toastSrv.error(error.error.response, 'Campos incompletos', {
          positionClass: 'toast-top-center',
        });
      },
    });
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
}
