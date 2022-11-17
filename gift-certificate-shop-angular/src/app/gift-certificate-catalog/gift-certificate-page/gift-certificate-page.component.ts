import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GiftCertificate } from 'src/app/models/gift-certificate';
import { CartService } from 'src/app/services/cart.service';
import { GiftCertificateService } from 'src/app/services/gift-certificate.service';

@Component({
  selector: 'app-gift-certificate-page',
  templateUrl: './gift-certificate-page.component.html',
  styleUrls: ['./gift-certificate-page.component.scss']
})
export class GiftCertificatePageComponent implements OnInit {

  giftCertificate!: GiftCertificate;
  imageURL!: string;

  constructor(private giftCertificateService: GiftCertificateService, private activatedRoute: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadId();
  }

  loadId() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        let id = Number(params.get('id'));
        this.loadGiftCertificate(id);
      }
    );
  }

  loadGiftCertificate(id: number) {
    this.giftCertificateService.getGiftCertificateById(id).subscribe({
      next: (response) => {
        this.giftCertificate = response;
      },
      complete: () => {
        this.setImageURL();
      }
    });
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
