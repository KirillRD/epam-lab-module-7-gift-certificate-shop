import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list-row',
  templateUrl: './user-list-row.component.html',
  styleUrls: ['./user-list-row.component.scss'],
  host: {'class': 'row justify-content-center align-items-center border-top border-bottom py-3'}
})
export class UserListRowComponent implements OnInit {

  @Input() user!: User;
  ordersCount!: number;

  constructor() { }

  ngOnInit(): void {
    this.loadOrdersCount();
  }

  loadOrdersCount() {
    let ordersCount: number = 0;
    this.user.orders.forEach(() => ordersCount++);
    this.ordersCount = ordersCount;
  }
}
