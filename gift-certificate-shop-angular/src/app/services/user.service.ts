import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { UserDataService } from './user-data.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_URL = "api/users";
  private readonly USER_COUNT_URL = "api/users/count";
  private readonly USER_LOGIN_URL = "api/users/login";

  constructor(private http: HttpClient, private userDataService: UserDataService, private paginationService: PaginationService) { }

  getUsers(search: string, page: number, size: number): Observable<User[]> {
    let params = new HttpParams();

    if (search) {
      params = params.append("search", search);
    }

    params = params.append("page", page);
    params = params.append("size", size);

    return this.http.get<User[]>(this.USER_URL, {params: params});
  }

  getUser(): Observable<User> {
    let id = this.userDataService.getId();
    let url = this.USER_URL + "/" + id;
    return this.http.get<User>(url);
  }

  getUserById(id: number): Observable<User> {
    let url = this.USER_URL + "/" + id;
    return this.http.get<User>(url);
  }

  existUserByLogin(name: string): Observable<number> {
    let url = this.USER_LOGIN_URL + "/" + name;
    return this.http.get<number>(url);
  }

  getCount(search: string): Observable<number> {
    let params = new HttpParams();

    if (search) {
      params = params.append("search", search);
    }

    return this.http.get<number>(this.USER_COUNT_URL, {params: params});
  }
}
