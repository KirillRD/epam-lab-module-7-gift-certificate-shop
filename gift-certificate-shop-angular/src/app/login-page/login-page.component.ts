import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Credential } from '../models/credential';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalErrorHandler } from 'src/app/error/global-error-handler';
import { ErrorEnum } from '../error/error-enum';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router, private userDataService: UserDataService, private formBuilder: FormBuilder, private globalErrorHandler: GlobalErrorHandler) { }

  credentials: FormGroup = this.formBuilder.group({
    username: ['', [
        Validators.required,
        Validators.maxLength(45),
        Validators.pattern('^(\\S+)@(\\S+)\\.(\\S+)$')
    ]],
    password: ['', [
        Validators.required
    ]]
  });
  invalidAuthenticationAlert: boolean = false;

  ngOnInit(): void {
  }

  login(credentials: Credential) {
    if (this.credentials.invalid) {
      for (let control of Object.keys(this.credentials.controls)) {
        this.credentials.controls[control].markAsTouched();
      }
      return;
    }

    this.authenticationService.login(credentials).subscribe({
      next: (response) => {
        this.userDataService.setToken(response.token);
      },
      error: (error) => {
        if (ErrorEnum.DUPLICATE.code == error.error.code) {
          this.invalidAuthenticationAlert = true;
        } else {
          this.globalErrorHandler.handleError(error);
        }
      },
      complete: () => {
        this.router.navigateByUrl('/home-page');
      }
    });
  }

  closeInvalidAuthenticationAlert() {
    this.invalidAuthenticationAlert = false;
  }
}
