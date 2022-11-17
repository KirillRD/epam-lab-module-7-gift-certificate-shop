import { Component, OnInit, Input } from '@angular/core';
import { GiftCertificate } from 'src/app/models/gift-certificate';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-gift-certificate-card',
  templateUrl: './gift-certificate-card.component.html',
  styleUrls: ['./gift-certificate-card.component.scss'],
  host: {'class': 'col'}
})
export class GiftCertificateCardComponent implements OnInit {

  @Input() giftCertificate!: GiftCertificate;
  imageURL!: string;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.setImageURL();
  }

  setImageURL() {
    let name = this.giftCertificate.name;
    let imageNumber = name.substring(name.lastIndexOf('_') + 1);
    this.imageURL = imageNumber.substring(imageNumber.length - 2);
    this.imageURL = "/assets/images/catalog/" + this.imageURL + ".jpg";
  }

  addToCart() {
    this.cartService.addGiftCertificate(this.giftCertificate);
  }
}
