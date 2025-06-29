import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BillService } from '../../../service/bill/bill.service';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../service/product/product.service';
import { Table } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select'; // If you use `p-select`
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
@Component({
  selector: 'app-bill',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    TableModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    RatingModule,
    TagModule,
    InputNumberModule,
    RadioButtonModule,
    TextareaModule,
    DropdownModule,
    SelectModule,
    IconFieldModule,
    InputIconModule,
    SelectButtonModule,],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent {
  form: FormGroup;
  productArr: any
  invoceno: any
  totalprice: any
  totaltax: any
  totalbill: any
  customerlist: any
  updateid: any
  upadteindex: any
  customerdetails = new FormGroup({
    customer: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required)
  })
  constructor(private billservices: BillService, private fb: FormBuilder, private router: Router, private activeroute: ActivatedRoute) {
    this.invoceno = "AR" + Math.floor(1000 + Math.random() * 9000);
    this.activeroute.queryParams.subscribe((data: any) => {
      this.updateid = data.id
      this.upadteindex = data.index
    })
    this.getdata()
    this.form = this.fb.group({
      products: this.fb.array([])
    });
    if (this.updateid, this.upadteindex) {
      this.updateinvoice()
    } else {
      this.addProduct();
    }
  }

  getdata() {
    this.billservices.getproduct().subscribe((data: any) => {
      this.productArr = data
    })
    this.billservices.getcustomer().subscribe((data: any) => {
      this.customerlist = data
    })
  }

  get productsFormArray(): FormArray {
    return this.form.get('products') as FormArray;
  }

  addProduct() {
    const productGroup = this.fb.group({
      name: ['', Validators.required],
      quntity: ['', Validators.required],
      price: ['', Validators.required],
      tax: ['', Validators.required],
      totalprice: ['', Validators.required]
    });
    this.productsFormArray.push(productGroup);
  }

  findproductprice(event: any, index: number) {
    const product = this.productArr.find((item: any) => item.name === event.target.value);
    if (product) {
      const group = this.productsFormArray.at(index);
      group.patchValue({ price: product.price, quntity: 1 });
    }
  }

  findtotal(event: any, index: any) {
    const group = this.productsFormArray.at(index);
    let price = group.value.price * group.value.quntity
    price = price + (price * group.value.tax / 100)
    group.patchValue({ totalprice: price })
    this.getbilltotal()
  }

  getbilltotal() {
    this.totalprice = this.productsFormArray.value.reduce((acc: any, curr: any) => acc + (curr.price * curr.quntity), 0)
    this.totalbill = this.productsFormArray.value.reduce((acc: any, curr: any) => acc + curr.totalprice, 0)
    this.totaltax = this.totalbill - this.totalprice
  }

  removeProduct(index: number) {
    this.productsFormArray.removeAt(index);
    this.getbilltotal()
  }

  submit() {
    this.submitandassign()
  }

  updateinvoice() {
    let customer = (this.customerlist.filter((item: any) => item.id == this.updateid))[0]
    this.customerdetails.patchValue({
      customer: customer.id,
      date: customer.order[this.upadteindex].Date
    })
    customer.order[this.upadteindex].order.forEach((item: any) => {
      this.productsFormArray.push(this.fb.group({
        name: [item.name, Validators.required],
        quntity: [item.quntity, Validators.required],
        price: [item.price, Validators.required],
        tax: [item.tax, Validators.required],
        totalprice: [item.totalprice, Validators.required]
      }))
    })
    this.getbilltotal()
  }

  edited() {
    this.submitandassign()
  }

  submitandassign() {
    this.form.markAllAsTouched();
    this.customerdetails.markAllAsTouched();
    if (this.customerdetails.valid && this.form.valid) {
      let customer = this.customerdetails.value
      let order = this.form.value.products
      let data = (this.customerlist.filter((item: any) => item.id == customer.customer))[0]
      let finaloreder = {
        "Date": customer.date,
        "totalprice": this.totalbill,
        "invoiceno": this.invoceno,
        "order": order
      }
      if (this.updateid) {
        finaloreder.invoiceno = data.order[this.upadteindex].invoiceno
        data.order[this.upadteindex] = finaloreder
      } else {
        data.order.push(finaloreder)
      }
      this.billservices.addbill(data).subscribe((data: any) => { })
      this.router.navigateByUrl('/orderlist')
      this.form.reset()
      this.customerdetails.reset()
    }
  }
}