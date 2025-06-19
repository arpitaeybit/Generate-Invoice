import { Routes } from '@angular/router';
import { InputfildsComponent } from './component/inputfilds/inputfilds.component';
import { ProductprentComponent } from './component/inputfilds/product/productprent/productprent.component';
import { ImageComponent } from './component/image/image.component';
import { ImportExportComponent } from './component/import-export/import-export.component';
import { CrudComponent } from './component/CRUD/crud/crud.component';
import { BillComponent } from './component/billing/bill/bill.component';
import { OrderlistComponent } from './component/billing/orderlist/orderlist.component';

export const routes: Routes = [
    {
        path: '',
        component: BillComponent
    }, {
        path: 'orderlist',
        component: OrderlistComponent
    },
    {
        path: 'imnutfield',
        component: InputfildsComponent
    },
    {
        path: 'product',
        component: ProductprentComponent
    }, {
        path: 'image',
        component: ImageComponent
    }, {
        path: 'importexport',
        component: ImportExportComponent
    }, {
        path: 'crud',
        component: CrudComponent
    }
];
