import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly ORDER_URL = "api/orders";

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<any> {
    return this.http.post(this.ORDER_URL, order);
  }

  deleteOrder(id: number): Observable<any> {
    let url = this.ORDER_URL + "/" + id;
    return this.http.delete(url);
  }
}
