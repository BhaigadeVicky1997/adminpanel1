import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { CustomersSummaryComponent } from './customers-summary/customers-summary.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ExcelService } from '../service/excel.service';

const routes: Routes = [
  { path: 'view-customers', component: ViewCustomersComponent },
  { path: 'customer-summary', component: CustomersSummaryComponent }
]

@NgModule({
  declarations: [ViewCustomersComponent, CustomersSummaryComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    LayoutsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    ExcelService
  ]
})
export class CustomersModule { }
