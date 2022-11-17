import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GiftCertificate } from '../models/gift-certificate';
import { GiftCertificateService } from '../services/gift-certificate.service';

@Component({
  selector: 'app-gift-certificate-list',
  templateUrl: './gift-certificate-list.component.html',
  styleUrls: ['./gift-certificate-list.component.scss']
})
export class GiftCertificateListComponent implements OnInit {

  giftCertificates!: Array<GiftCertificate>;

  search!: string;
  tags!: Array<string>;
  sorts!: Array<string>;
  page!: number;
  size: number = 12;

  count!: number;

  private readonly GIFT_CERTIFICATE_LIST_URL = "/gift-certificate-list";

  constructor(private giftCertificateService: GiftCertificateService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        let search = params.get("search");
        let tags = params.getAll("tag");
        let sorts = params.getAll("sort");
        let page = params.get("page");

        if (search) {
          this.search = search;
        }

        if (tags) {
          this.tags = tags;
        }

        if (sorts) {
          this.sorts = sorts;
        }

        if (Number(page)) {
          this.page = Number(page);
          this.loadGiftCertificates();
        } else {
          this.navigateToGiftCertificateList(1);
        }
      }
    );
  }

  loadGiftCertificates() {
    this.giftCertificateService.getGiftCertificates(this.search, this.tags, this.sorts, this.page, this.size).subscribe({
      next: (response) => {
        this.giftCertificates = response;
      },
      complete: () => {
        this.loadCount();
      }
    });
  }

  navigateToGiftCertificateList(page: number) {
    let params: any = {};

    if (this.search) {
      params.search = this.search;
    }

    if (this.tags) {
      params.tag = this.tags;
    }

    if (this.sorts) {
      params.sort = this.sorts;
    }

    params.page = page;

    this.router.navigate([this.GIFT_CERTIFICATE_LIST_URL], {
      queryParams: params
    });
  }

  loadCount() {
    this.giftCertificateService.getCount(this.search, this.tags).subscribe(
      (response) => {
        this.count = response;
      }
    );
  }

  searchSubmit(searchParams: any) {
    this.search = searchParams.search;
    this.tags = searchParams.tags;
    this.sorts = searchParams.sorts;
    this.navigateToGiftCertificateList(1);
  }
}
