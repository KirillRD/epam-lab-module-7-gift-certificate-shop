import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Registration } from '../models/registration';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { GlobalErrorHandler } from 'src/app/error/global-error-handler';
import { ErrorEnum } from '../error/error-enum';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, private userService: UserService, private globalErrorHandler: GlobalErrorHandler) { }

  registrationForm: FormGroup = this.formBuilder.group({
    login: ['', {
      validators: [
        Validators.required,
        Validators.maxLength(45),
        Validators.pattern('^(\\S+)@(\\S+)\\.(\\S+)$')
      ],
      asyncValidators: [
        this.loginValidator.bind(this)
      ]
    }],
    password: ['', [
      Validators.required
    ]],
    confirmPassword: ['', [
      Validators.required
    ]],
    name: ['', [
      Validators.required,
      Validators.maxLength(45)
    ]],
    address: ['', [
      Validators.maxLength(45)
    ]],
    phone: ['', [
      Validators.pattern('^$|^\\+(?:[0-9]\\x20?){6,15}$'),
      Validators.maxLength(45)
    ]]
  }, {
    validators: this.confirmPasswordMatchValidator
  });
  loginExistsAlert: boolean = false;

  ngOnInit(): void {
  }

  registration(registration: Registration) {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.authenticationService.registration(registration).subscribe({
      error: (error) => {
        if (ErrorEnum.DUPLICATE.code == error.error.code) {
          this.loginExistsAlert = true;
        } else {
          this.globalErrorHandler.handleError(error);
        }
      },
      complete: () => {
        this.router.navigateByUrl('/home-page');
      }
    });
  }

  confirmPasswordMatchValidator(control: AbstractControl) {
    const password: string = control.get("password")?.value;
    const confirmPassword: string = control.get("confirmPassword")?.value;

    if (!confirmPassword) {
      control.get("confirmPassword")?.setErrors({ required: true });
    } else if (password != confirmPassword) {
      control.get("confirmPassword")?.setErrors({ confirmPasswordMatch: true });
    }
  }

  loginValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.existUserByLogin(control.value).pipe(
      map((existUser) => (existUser ? { loginExists: true } : null))
    );
  }

  closeLoginExistsAlert() {
    this.loginExistsAlert = false;
  }
}
