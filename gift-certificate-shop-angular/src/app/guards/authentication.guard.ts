import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from '../services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  private readonly ALL_URL = [
    "/home-page",
    "/gift-certificate-catalog",
    "/gift-certificate-page",
    "/error-page"
  ];

  private readonly AUTHENTICATED_URLS = [
    "/user-page"
  ];

  private readonly GUEST_URLS = [
    ...this.ALL_URL,
    "/login-page",
    "/registration-page"
  ];

  private readonly USER_URLS = [
    ...this.ALL_URL,
    ...this.AUTHENTICATED_URLS,
    "/cart-page"
  ];

  private readonly ADMIN_URLS = [
    ...this.ALL_URL,
    ...this.AUTHENTICATED_URLS,
    "/user-list",
    "/user-list-user-page",
    "/tag-list",
    "/gift-certificate-list",
    "/tag-edit-page",
    "/gift-certificate-edit-page",
    "/tag-add-page",
    "/gift-certificate-add-page"
  ];

  private readonly ERROR_PAGE = "/error-page";

  constructor(private userDataService: UserDataService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let result = false;

      if (this.userDataService.isAuthenticated()) {
        result =
        (this.userDataService.hasRole('USER') && this.isInclude(this.USER_URLS, state.url))
        ||
        (this.userDataService.hasRole('ADMIN') && this.isInclude(this.ADMIN_URLS, state.url));
      } else {
        result = this.isInclude(this.GUEST_URLS, state.url);
      }

      if (!result) {
        this.router.navigateByUrl(this.ERROR_PAGE);
      }

      return result;
  }

  private isInclude(urls: Array<string>, currentUrl: string): boolean {
    for (let url of urls) {
      if (currentUrl.indexOf(url) == 0) {
        return true;
      }
    }
    return false;
  }
}
