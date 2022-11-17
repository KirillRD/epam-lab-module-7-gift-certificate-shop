import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Credential } from '../models/credential';
import { Token } from '../models/token';
import { Observable } from 'rxjs';
import { Registration } from '../models/registration';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly LOGIN_URL = "api/login";
  private readonly REGISTRATION_URL = "api/registration";
  private readonly LOGOUT_URL = "api/logout";

  constructor(private http: HttpClient) { }

  login(credentials: Credential): Observable<Token> {
    return this.http.post<Token>(this.LOGIN_URL, {
      username: credentials.username,
      password: credentials.password
    });
  }

  registration(registration: Registration): Observable<any> {
    return this.http.post<any>(this.REGISTRATION_URL, {
      login: registration.login,
      password: registration.password,
      name: registration.name,
      address: registration.address,
      phone: registration.phone
    });
  }

  logout() {
    return this.http.post<any>(this.LOGOUT_URL, {});
  }
}
