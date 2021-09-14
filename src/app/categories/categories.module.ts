import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { CategoriesSummaryComponent } from './categories-summary/categories-summary.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {ReactiveFormsModule} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  { path: 'view-categories', component: ViewCategoriesComponent },
  { path: 'add-categories', component: AddCategoriesComponent },
  { path: 'categories-summary/:id', component: CategoriesSummaryComponent },
];
@NgModule({
  declarations: [ViewCategoriesComponent, AddCategoriesComponent, CategoriesSummaryComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LayoutsModule,
    NgxPaginationModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriesModule { }
