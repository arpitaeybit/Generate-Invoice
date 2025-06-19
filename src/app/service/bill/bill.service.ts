import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getproduct() {
    return this.http.get('http://localhost:3000/product')
  }

  getcustomer() {
    return this.http.get('http://localhost:3000/customer')
  }

  addbill(data: any) {
    return this.http.put(`http://localhost:3000/customer/${data.id}`, data)
  }
}
