import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {
  alldata: any = [
    { city: "Mumbai", contectno: 9876543210, email: "riya.sharma@gmail.com", gender: "female", name: "Riya Sharma", password: "Riya@123" },
    { city: "Delhi", contectno: 9123456780, email: "rahul.verma@yahoo.com", gender: "male", name: "Rahul Verma", password: "Rahul@456" },
    { city: "Bangalore", contectno: 9988776655, email: "anita.patil@outlook.com", gender: "female", name: "Anita Patil", password: "Anita#789" },
    { city: "Kolkata", contectno: 9871203345, email: "amit.das@gmail.com", gender: "male", name: "Amit Das", password: "Amit@2024" },
    { city: "Chennai", contectno: 8765432190, email: "meena.r@gmail.com", gender: "female", name: "Meena Rajan", password: "Meena@007" },
    { city: "Pune", contectno: 9012345678, email: "sanjay.kulkarni@gmail.com", gender: "male", name: "Sanjay Kulkarni", password: "Sanjay@456" },
    { city: "Hyderabad", contectno: 9988001122, email: "asha.khan@gmail.com", gender: "female", name: "Asha Khan", password: "Asha#321" },
    { city: "Jaipur", contectno: 9876001234, email: "manish.mehta@gmail.com", gender: "male", name: "Manish Mehta", password: "Manish@100" },
    { city: "Surat", contectno: 9123456700, email: "neha.jain@gmail.com", gender: "female", name: "Neha Jain", password: "Neha@Pass1" },
    { city: "Ahmedabad", contectno: 9998887776, email: "vikas.patel@gmail.com", gender: "male", name: "Vikas Patel", password: "Vikas@2025" }
  ];

  viewdata: any = []
  newdata: boolean = true
  index: any
  search: any = ''
  order = true
  currentpage = 0
  totalpage: number = 0
  limit: any = 2
  user = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    contectno: new FormControl(''),
    gender: new FormControl(''),
    city: new FormControl('')
  })

  constructor() {
    this.getdata()
  }

  getdata(event?: any) {
    this.viewdata = this.alldata
    if (this.search !== '') {
      this.viewdata = this.alldata.filter((item: any) => item.name.toLowerCase().trim().includes(this.search.toLowerCase().trim()))
    }
    if (event) {
      this.currentpage = 0
    }
    this.totalpage = Math.ceil(this.viewdata.length / parseInt(this.limit))
    this.viewdata = this.viewdata.slice(this.currentpage * parseInt(this.limit), (this.currentpage * parseInt(this.limit)) + parseInt(this.limit))
  }

  adduser() {
    if (this.newdata) {
      this.alldata.push(this.user.value)
      this.user.reset()
      this.getdata()
    } else {
      this.editvalue()
    }
  }

  deleteuser(index: any) {
    this.alldata.splice(index, 1)
    this.getdata()
  }

  updatedata(index: any) {
    this.newdata = false
    this.index = index
    this.user.patchValue(this.alldata[index])
  }

  editvalue() {
    this.alldata[this.index] = this.user.value
    this.user.reset()
    this.newdata = true
  }

  sortbtn(field: any) {
    if (this.order) {
      this.viewdata.sort((a: any, b: any) => b[field].localeCompare(a[field]));
    } else {
      this.viewdata.sort((a: any, b: any) => a[field].localeCompare(b[field]));
    }
    this.order = !this.order
  }

  changpage(page: number) {
    this.currentpage = page
    this.getdata()
  }
}
