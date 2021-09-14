import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCoupanComponent } from './view-coupan/view-coupan.component';
import { AddCoupanComponent } from './add-coupan/add-coupan.component';
import { CoupanCodeSummaryComponent } from './coupan-code-summary/coupan-code-summary.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";



const routes: Routes = [
  { path: 'view-coupan-code', component: ViewCoupanComponent },
  { path: 'add-coupan-code', component: AddCoupanComponent },
  { path: 'coupan-code-summary/:id/:type', component: CoupanCodeSummaryComponent },
];
@NgModule({
  declarations: [ViewCoupanComponent, AddCoupanComponent, CoupanCodeSummaryComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LayoutsModule,
    NgxPaginationModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoupanCodeModule { }
