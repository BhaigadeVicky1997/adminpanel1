import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBrandComponent } from './view-brand/view-brand.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrandSummaryComponent } from './brand-summary/brand-summary.component';
import {ReactiveFormsModule} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";


const routes: Routes = [
  { path: 'view-brand', component: ViewBrandComponent },
  { path: 'add-brand', component: AddBrandComponent },
  { path: 'brand-summary/:id', component: BrandSummaryComponent },
];
@NgModule({
  declarations: [ViewBrandComponent, AddBrandComponent, BrandSummaryComponent],
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
export class BrandsModule { }
