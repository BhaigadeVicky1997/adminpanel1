import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSubCategoriesComponent } from './view-sub-categories/view-sub-categories.component';
import { AddSubCategoriesComponent } from './add-sub-categories/add-sub-categories.component';
import { SubCategoriesSummaryComponent } from './sub-categories-summary/sub-categories-summary.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {ReactiveFormsModule} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  { path: 'view-sub-categories', component: ViewSubCategoriesComponent },
  { path: 'add-sub-categories', component: AddSubCategoriesComponent },
  { path: 'sub-categories-summary/:id', component: SubCategoriesSummaryComponent },
];
@NgModule({
  declarations: [ViewSubCategoriesComponent, AddSubCategoriesComponent, SubCategoriesSummaryComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LayoutsModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SubCategoriesModule { }
