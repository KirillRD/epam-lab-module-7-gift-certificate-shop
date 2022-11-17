import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiftCertificate } from 'src/app/models/gift-certificate';
import { GiftCertificateService } from 'src/app/services/gift-certificate.service';

@Component({
  selector: 'app-gift-certificate-list-card',
  templateUrl: './gift-certificate-list-card.component.html',
  styleUrls: ['./gift-certificate-list-card.component.scss'],
  host: {'class': 'col'}
})
export class GiftCertificateListCardComponent implements OnInit {

  @Input() giftCertificate!: GiftCertificate;
  imageURL!: string;

  constructor(private giftCertificateService: GiftCertificateService, private router: Router) { }

  ngOnInit(): void {
    this.setImageURL();
  }

  setImageURL() {
    let name = this.giftCertificate.name;
    let imageNumber = name.substring(name.lastIndexOf('_') + 1);
    this.imageURL = imageNumber.substring(imageNumber.length - 2);
    this.imageURL = "/assets/images/catalog/" + this.imageURL + ".jpg";
  }

  deleteGiftCertificate() {
    this.giftCertificateService.deleteGiftCertificate(this.giftCertificate.id).subscribe({
      complete: () => {
        this.router.navigateByUrl('/gift-certificate-list').then(
          () => window.location.reload()
        );
      }
    });
  }
}
