import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { TokenUserData } from '../models/token-user-data';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private readonly TOKEN = "token";

  constructor() { }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN);
  }

  decodeToken(token: string) {
    return jwtDecode<TokenUserData>(token);
  }

  getUserData() {
    return this.decodeToken(this.getToken()!);
  }

  getId (): number {
    return this.getUserData().id;
  }

  getLogin(): string {
    return this.getUserData().login;
  }

  getName(): string {
    return this.getUserData().name;
  }

  getRoles(): Array<string> {
    return this.getUserData().roles;
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  isAuthenticated(): boolean {
    let token = this.getToken();
    if (token == null) {
      return false;
    }

    let exp = this.getUserData().exp * 1000;
    let now = new Date().getTime();
    if (now > exp) {
      return false;
    }

    return true;
  }
}
