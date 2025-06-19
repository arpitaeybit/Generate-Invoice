import { Component } from '@angular/core';
import { ProductService } from '../../service/product/product.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-import-export',
  standalone: true,
  imports: [TableModule, ButtonModule, FormsModule, CommonModule],
  providers: [ProductService],
  templateUrl: './import-export.component.html',
  styleUrl: './import-export.component.css'
})
export class ImportExportComponent {
  products!: Product[];

  selectedProducts!: Product[];

  constructor(private productService: ProductService) { }

  cols!: Column[];

  exportColumns!: ExportColumn[];

  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });

    this.cols = [
      { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }
}