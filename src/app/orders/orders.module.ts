import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OrdersSummaryComponent } from './orders-summary/orders-summary.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from "ngx-spinner";
import { ExcelService } from '../service/excel.service';

const routes: Routes = [
  { path: 'view-orders', component: ViewOrdersComponent },
  { path: 'order-summary/:id/:guestId/:clientid', component: OrdersSummaryComponent },

];

@NgModule({
  declarations: [ViewOrdersComponent, OrdersSummaryComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LayoutsModule,
    NgxPaginationModule,
    FormsModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ExcelService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdersModule { }
