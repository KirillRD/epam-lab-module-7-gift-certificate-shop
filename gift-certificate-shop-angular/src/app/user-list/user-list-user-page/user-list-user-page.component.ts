import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list-user-page',
  templateUrl: './user-list-user-page.component.html',
  styleUrls: ['./user-list-user-page.component.scss']
})
export class UserListUserPageComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadId();
  }

  loadId() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        let id = Number(params.get('id'));
        this.loadUser(id);
      }
    );
  }

  loadUser(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (response) => {
        this.user = response;
      }
    });
  }
}
