import { Component, Input, OnInit } from '@angular/core';
import { GiftCertificateCart } from 'src/app/models/gift-certificate-cart';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-user-order-row',
  templateUrl: './user-order-row.component.html',
  styleUrls: ['./user-order-row.component.scss'],
  host: {'class': 'col'}
})
export class UserOrderRowComponent implements OnInit {

  @Input() order!: Order;
  giftCertificatesCount!: number;
  giftCartificateCarts: Array<GiftCertificateCart> = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadtGiftCertificatesCount();
    this.loadGiftCertificateCarts();
  }

  loadtGiftCertificatesCount() {
    let count: number = 0;
    this.order.orderDetails.forEach(() => count++);
    this.giftCertificatesCount = count;
  }

  loadGiftCertificateCarts() {
    this.order.orderDetails.forEach(orderDetails => {
      if (this.containsGiftCartificate(orderDetails.giftCertificate.id)) {
        let index = this.getIndexOfGiftCertificate(orderDetails.giftCertificate.id);
        this.giftCartificateCarts[index].count += 1;
      } else {
        this.giftCartificateCarts.push(({
          giftCertificate: orderDetails.giftCertificate,
          count: 1
        } as GiftCertificateCart));
      }
    });
  }

  containsGiftCartificate(id: number): boolean {
    return this.giftCartificateCarts.some(giftCartificateCart => giftCartificateCart.giftCertificate.id == id);
  }

  getIndexOfGiftCertificate(id: number): number {
    return this.giftCartificateCarts.map(giftCertificateCart => giftCertificateCart.giftCertificate.id).indexOf(id);
  }

  deleteOrder() {
    this.orderService.deleteOrder(this.order.id).subscribe({
      complete: () => {
        window.location.reload();
      }
    });
  }
}
