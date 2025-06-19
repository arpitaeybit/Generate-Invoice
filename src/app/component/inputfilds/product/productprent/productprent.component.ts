import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductchildComponent } from '../productchild/productchild.component';
import { CommonModule } from '@angular/common';
import { BlobOptions } from 'buffer';

@Component({
  selector: 'app-productprent',
  imports: [ProductchildComponent, CommonModule],
  templateUrl: './productprent.component.html',
  styleUrl: './productprent.component.css'
})
export class ProductprentComponent {
  product: any
  view: boolean = false
  viewproduct: any = {}
  constructor(private http: HttpClient) { this.getproduct() }

  getproduct() {
    this.http.get('http://localhost:3000/product').subscribe((data: any) => {
      this.product = data
    })
  }
  deleteproduct(id: any) {
    this.http.delete(`http://localhost:3000/product/${id}`).subscribe((data: any) => { })
    this.getproduct()
  }

  showproduct(data: any) {
    this.view = true
    this.viewproduct = data
    setTimeout(() => {
      this.view = false
    }, 10000);
  }
}
