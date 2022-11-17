import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, ErrorHandler } from "@angular/core";
import { Router } from "@angular/router";
import { ErrorEnum } from "./error-enum";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private router: Router) {}

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.error.message && error.error.code && Object.values(ErrorEnum).includes(error.error.code)) {
        localStorage.setItem("message", error.error.message);
        localStorage.setItem("code", error.error.code);
        localStorage.setItem("status", String(error.error.code).slice(0, 3));
      } else {
        localStorage.setItem("message", "error.500");
        localStorage.setItem("code", String(500_000));
        localStorage.setItem("status", String(500_000).slice(0, 3));
      }
    } else {
      localStorage.setItem("message", "error.500");
      localStorage.setItem("code", String(500_000));
      localStorage.setItem("status", String(500_000).slice(0, 3));
    }

    this.router.navigateByUrl('/error-page');
  }
}
