import { NgIf } from '@angular/common';
import { Component, input, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-productchild',
  imports: [NgIf],
  templateUrl: './productchild.component.html',
  styleUrl: './productchild.component.css'
})
export class ProductchildComponent {
  @Input() show: boolean = false;
  @Input() product: any
}
