import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GiftCertificateCart } from 'src/app/models/gift-certificate-cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-row',
  templateUrl: './cart-row.component.html',
  styleUrls: ['./cart-row.component.scss']
})
export class CartRowComponent implements OnInit {

  @Input() giftCertificateCart!: GiftCertificateCart;
  @Output() onDelete = new EventEmitter();
  @Output() onCountChange = new EventEmitter();
  countInput: FormControl = new FormControl();
  imageURL!: string;

  private readonly MIN_COUNT: number = 1;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCountInput();
    this.setImageURL();
  }

  setImageURL() {
    let name = this.giftCertificateCart.giftCertificate.name;
    let imageNumber = name.substring(name.lastIndexOf('_') + 1);
    this.imageURL = imageNumber.substring(imageNumber.length - 2);
    this.imageURL = "/assets/images/catalog/" + this.imageURL + ".jpg";
  }

  loadGiftCertificateCart() {
    this.giftCertificateCart = this.cartService.getGiftCertificateCart(this.giftCertificateCart.giftCertificate);
    this.loadCountInput();
  }

  loadCountInput() {
    this.countInput.setValue(this.giftCertificateCart.count.toString());
  }

  countInputChange(countInput: string) {
    let count: number = Number(countInput.replace(/[^0-9]/g, ''));

    if (count != this.giftCertificateCart.count) {
      if (count < this.MIN_COUNT) {
        count = this.MIN_COUNT;
      }

      this.giftCertificateCart.count = count;

      this.cartService.addGiftCertificateCart(this.giftCertificateCart);
      this.onCountChange.emit();
      this.loadGiftCertificateCart();
    } else if (countInput != count.toString()) {
      this.loadCountInput();
    }
  }

  increaseCount() {
    this.cartService.addGiftCertificate(this.giftCertificateCart.giftCertificate);
    this.onCountChange.emit();
    this.loadGiftCertificateCart();
  }

  decreaseCount() {
    if (Number(this.countInput.value) > this.MIN_COUNT) {
      this.cartService.subtractGiftCertificate(this.giftCertificateCart.giftCertificate);
      this.onCountChange.emit();
      this.loadGiftCertificateCart();
    }
  }

  deleteGiftCertificate() {
    this.cartService.removeGiftCertificate(this.giftCertificateCart.giftCertificate);
    this.onDelete.emit();
  }
}
