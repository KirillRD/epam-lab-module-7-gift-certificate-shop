import { Order } from "./order";

export class User {
  id: number;
  login: string;
  name: string;
  address: string;
  phone: string;
  orders: Array<Order>;

  constructor() {
    this.id = 0;
    this.login = "";
    this.name = "";
    this.address = "";
    this.phone = "";
    this.orders = [];
  }
}
