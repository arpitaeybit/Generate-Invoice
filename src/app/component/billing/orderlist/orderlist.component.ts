import { Component } from '@angular/core';
import { BillService } from '../../../service/bill/bill.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderlist',
  imports: [CommonModule],
  templateUrl: './orderlist.component.html',
  styleUrl: './orderlist.component.css'
})
export class OrderlistComponent {
  orederdata: any

  constructor(private billservices: BillService) {
    this.billservices.getcustomer().subscribe((data: any) => {
      this.orederdata = data
    })
    console.log(this.orederdata);
  }


}
