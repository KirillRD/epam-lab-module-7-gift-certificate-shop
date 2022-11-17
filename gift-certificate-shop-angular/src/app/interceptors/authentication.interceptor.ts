import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDataService } from '../services/user-data.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  private readonly AUTHENTICATION_HEADER_NAME = "Authorization";
  private readonly AUTHENTICATION_TOKEN_PREFIX = "Bearer ";

  constructor(private userDataService: UserDataService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.userDataService.isAuthenticated()) {
      request = request.clone({
        headers: request.headers.set(
          this.AUTHENTICATION_HEADER_NAME,
          this.AUTHENTICATION_TOKEN_PREFIX + this.userDataService.getToken()
        )
      });
    }

    return next.handle(request);
  }
}
