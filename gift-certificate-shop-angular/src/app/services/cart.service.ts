import { Injectable } from '@angular/core';
import { GiftCertificate } from '../models/gift-certificate';
import { GiftCertificateCart } from '../models/gift-certificate-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly CART = "cart";

  constructor() { }

  setCart(cart: Array<GiftCertificateCart>) {
    localStorage.setItem(this.CART, JSON.stringify(cart));
  }

  getCart(): Array<GiftCertificateCart> {
    return JSON.parse(localStorage.getItem(this.CART) || "[]");
  }

  getGiftCertificates(): Array<GiftCertificate> {
    return this.getCart().map(giftCertificateCart => giftCertificateCart.giftCertificate);
  }

  getGiftCertificateCart(giftCertificate: GiftCertificate): GiftCertificateCart {
    return this.getCart()[this.getIndexOfGiftCertificate(giftCertificate)];
  }

  containsGiftCartificate(giftCertificate: GiftCertificate): boolean {
    return this.getGiftCertificates().some(item => item.id == giftCertificate.id);
  }

  getIndexOfGiftCertificate(giftCertificate: GiftCertificate): number {
    return this.getGiftCertificates().map(item => item.id).indexOf(giftCertificate.id);
  }

  addGiftCertificate(giftCertificate: GiftCertificate) {
    let cart = this.getCart();
    if (this.containsGiftCartificate(giftCertificate)) {
      let index = this.getIndexOfGiftCertificate(giftCertificate);
      cart[index].count += 1;
    } else {
      cart.push({
        giftCertificate: giftCertificate,
        count: 1
      } as GiftCertificateCart);
    }
    this.setCart(cart);
  }

  addGiftCertificateCart(giftCertificateCart: GiftCertificateCart) {
    let cart = this.getCart();
    if (this.containsGiftCartificate(giftCertificateCart.giftCertificate)) {
      let index = this.getIndexOfGiftCertificate(giftCertificateCart.giftCertificate);
      cart[index] = giftCertificateCart;
    } else {
      cart.push(giftCertificateCart);
    }
    this.setCart(cart);
  }

  subtractGiftCertificate(giftCertificate: GiftCertificate) {
    let cart = this.getCart();
    if (this.containsGiftCartificate(giftCertificate)) {
      let index = this.getIndexOfGiftCertificate(giftCertificate);
      cart[index].count = cart[index].count - 1;
      this.setCart(cart);
    }
  }

  removeGiftCertificate(giftCertificate: GiftCertificate) {
    let cart = this.getCart();
    if (this.containsGiftCartificate(giftCertificate)) {
      let index = this.getIndexOfGiftCertificate(giftCertificate);
      cart.splice(index, 1);
      this.setCart(cart);
    }
  }
}
