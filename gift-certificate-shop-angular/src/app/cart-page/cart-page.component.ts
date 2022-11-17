import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiftCertificateCart } from '../models/gift-certificate-cart';
import { Order } from '../models/order';
import { OrderDetails } from '../models/order-details';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cart!: Array<GiftCertificateCart>;
  totalPrice!: number;

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cart = this.cartService.getCart();
    this.loadTotalPrice();
  }

  loadTotalPrice() {
    let cart: Array<GiftCertificateCart> = this.cartService.getCart();
    let totalPrice: number = 0;
    cart.forEach(giftCertificateCart => {
      totalPrice = totalPrice + giftCertificateCart.giftCertificate.price * giftCertificateCart.count;
    });
    this.totalPrice = totalPrice;
  }

  submitOrder() {
    let order: Order = ({
      price: this.totalPrice,
      orderDetails: this.getOrderDetails()
    } as Order);

    this.orderService.createOrder(order).subscribe({
      complete: () => {
        this.cartService.setCart([]);
        this.router.navigateByUrl('gift-certificate-catalog');
      }
    });
  }

  getOrderDetails() {
    let result: Array<OrderDetails> = [];
    let cart: Array<GiftCertificateCart> = this.cartService.getCart();
    cart.forEach(giftCertificateCart => {
      for (let i = 0; i < giftCertificateCart.count; i++) {
        result.push(({
          price: giftCertificateCart.giftCertificate.price,
          giftCertificate: giftCertificateCart.giftCertificate
        } as OrderDetails));
      }
    })
    return result;
  }
}
