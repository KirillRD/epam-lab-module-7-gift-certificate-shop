import { OrderDetails } from "./order-details";

export class Order {
  id: number;
  price: number;
  purchaseTime: Date;
  orderDetails: Array<OrderDetails>;

  constructor() {
    this.id = 0;
    this.price = 0;
    this.purchaseTime = new Date();
    this.orderDetails = [];
  }
}
