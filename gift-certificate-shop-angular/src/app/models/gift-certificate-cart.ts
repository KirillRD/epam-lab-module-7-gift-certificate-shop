import { GiftCertificate } from "./gift-certificate";

export class GiftCertificateCart {
  giftCertificate: GiftCertificate;
  count: number;

  constructor() {
    this.giftCertificate = new GiftCertificate();
    this.count = 0;
  }
}
