import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GiftCertificate } from '../models/gift-certificate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiftCertificateService {

  private readonly GIFT_CERTIFICATE_URL = "api/gift-certificates";
  private readonly GIFT_CERTIFICATE_COUNT_URL = "api/gift-certificates/count";
  private readonly GIFT_CERTIFICATE_NAME_URL = "api/gift-certificates/name";

  constructor(private http: HttpClient) { }

  getGiftCertificates(search: string, tags: Array<string>, sorts: Array<string>, page: number, size: number): Observable<GiftCertificate[]> {
    let params = new HttpParams();

    if (search) {
      params = params.append("search", search);
    }

    if (tags) {
      for (let tag of tags) {
        params = params.append("tag", tag);
      }
    }

    if (sorts) {
      for (let sort of sorts) {
        params = params.append("sort", sort);
      }
    }

    params = params.append("page", page);
    params = params.append("size", size);

    return this.http.get<GiftCertificate[]>(this.GIFT_CERTIFICATE_URL, {params: params});
  }

  getGiftCertificateById(id: number): Observable<GiftCertificate> {
    let url = this.GIFT_CERTIFICATE_URL + "/" + id;
    return this.http.get<GiftCertificate>(url);
  }

  existGiftCertificateByName(name: string): Observable<number> {
    let url = this.GIFT_CERTIFICATE_NAME_URL + "/" + name;
    return this.http.get<number>(url);
  }

  getCount(search: string, tags: Array<string>): Observable<number> {
    let params = new HttpParams();

    if (search) {
      params = params.append("search", search);
    }

    if (tags) {
      for (let tag of tags) {
        params = params.append("tag", tag);
      }
    }

    return this.http.get<number>(this.GIFT_CERTIFICATE_COUNT_URL, {params: params});
  }

  createGiftCertificate(giftCertificate: GiftCertificate): Observable<any> {
    return this.http.post(this.GIFT_CERTIFICATE_URL, giftCertificate);
  }

  updateGiftCertificate(giftCertificate: GiftCertificate): Observable<any> {
    let url = this.GIFT_CERTIFICATE_URL + "/" + giftCertificate.id;
    return this.http.patch(url, giftCertificate);
  }

  deleteGiftCertificate(id: number): Observable<any> {
    let url = this.GIFT_CERTIFICATE_URL + "/" + id;
    return this.http.delete(url);
  }
}
