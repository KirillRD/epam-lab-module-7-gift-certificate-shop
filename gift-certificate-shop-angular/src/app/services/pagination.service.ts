import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  readonly PAGE = "page";
  readonly SIZE = "size";

  constructor() { }

  getPaginationParams(page: number, size: number): HttpParams {
    return new HttpParams()
      .set(this.PAGE, page)
      .set(this.SIZE, size);
  }
}
