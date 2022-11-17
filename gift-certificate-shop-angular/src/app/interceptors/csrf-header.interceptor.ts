import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CsrfHeaderInterceptor implements HttpInterceptor {

  private readonly CSRF_COOKIE_NAME = "XSRF-TOKEN";
  private readonly CSRF_HEADER_NAME = "X-XSRF-TOKEN";

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let csrfValue = this.cookieService.get(this.CSRF_COOKIE_NAME);

    if (csrfValue) {
      request = request.clone({
        headers: request.headers.set(this.CSRF_HEADER_NAME, csrfValue)
      });
    }

    return next.handle(request);
  }
}
