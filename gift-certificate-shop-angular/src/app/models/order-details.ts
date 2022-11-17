import { GiftCertificate } from "./gift-certificate";

export class OrderDetails {
  id: number;
  price: number;
  giftCertificate: GiftCertificate;

  constructor() {
    this.id = 0;
    this.price = 0;
    this.giftCertificate = new GiftCertificate();
  }
}
