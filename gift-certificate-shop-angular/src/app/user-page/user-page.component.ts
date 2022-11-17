import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserDataService } from '../services/user-data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private userDataService: UserDataService, private router: Router) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser().subscribe({
      next: (response) => {
        this.user = response;
      }
    });
  }

  logout() {
    this.authenticationService.logout().subscribe({
      complete: () => {
        this.userDataService.removeToken();
        this.router.navigateByUrl("/home-page");
      }
    });
  }
}
