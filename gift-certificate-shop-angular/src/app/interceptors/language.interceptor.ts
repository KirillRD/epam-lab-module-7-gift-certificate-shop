import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService } from '../services/language.service';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

  private readonly LANG = "lang";

  constructor(private languageService: LanguageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      params: request.params.set(this.LANG, this.languageService.getLanguage())
    });

    return next.handle(request);
  }
}
