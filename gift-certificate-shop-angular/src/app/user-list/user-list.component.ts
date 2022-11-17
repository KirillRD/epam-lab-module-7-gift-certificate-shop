import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users!: Array<User>;

  search!: string;
  page!: number;
  size: number = 10;

  count!: number;

  private readonly USER_LIST_URL = "/user-list";

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        let search = params.get("search");
        let page = params.get("page");

        if (search) {
          this.search = search;
        }

        if (page) {
          this.page = Number(page);
          this.loadUsers();
        } else {
          this.navigateToUserList(1);
        }
      }
    );
  }

  loadUsers() {
    this.userService.getUsers(this.search, this.page, this.size).subscribe({
      next: (response) => {
        this.users = response;
      },
      complete: () => {
        this.loadCount();
      }
    });
  }

  navigateToUserList(page: number) {
    let params: any = {};

    if (this.search) {
      params.search = this.search;
    }

    params.page = page;

    this.router.navigate([this.USER_LIST_URL], {
      queryParams: params
    });
  }

  loadCount() {
    this.userService.getCount(this.search).subscribe(
      (response) => {
        this.count = response;
      }
    );
  }

  searchSubmit(searchParams: any) {
    this.search = searchParams.search;
    this.navigateToUserList(1);
  }
}
