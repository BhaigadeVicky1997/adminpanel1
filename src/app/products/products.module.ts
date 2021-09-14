import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductsComponent } from './view-products/view-products.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AddProductsComponent } from './add-products/add-products.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { ToastrModule } from 'ngx-toastr';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ProductsVariantSummaryComponent } from './products-variant-summary/products-variant-summary.component';
import { AddProductVariantPictureComponent } from './add-product-variant-picture/add-product-variant-picture.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddProductFlavourComponent } from './add-product-flavour/add-product-flavour.component';
import { AddProductCoupanCodeComponent } from './add-product-coupan-code/add-product-coupan-code.component';
import { NgxSpinnerModule } from "ngx-spinner";
import {ReactiveFormsModule} from '@angular/forms';
import { UpdateProductFlavourComponent } from './update-product-flavour/update-product-flavour.component';


const routes: Routes = [
  { path: 'view-products', component: ViewProductsComponent },
  { path: 'add-products', component: AddProductsComponent },
  { path: 'product-variant-summary/:id', component: ProductsVariantSummaryComponent },
  { path: 'add-product-variant-picture/:id', component: AddProductVariantPictureComponent },
  { path: 'add-product-flavour/:id', component: AddProductFlavourComponent },
  { path: 'add-product-coupan-code', component: AddProductCoupanCodeComponent },
  { path: 'product-flavour-summary/:id/:productVID', component: UpdateProductFlavourComponent }
];

@NgModule({
  declarations: [ViewProductsComponent, AddProductsComponent, ProductsVariantSummaryComponent, AddProductVariantPictureComponent, AddProductFlavourComponent, AddProductCoupanCodeComponent, UpdateProductFlavourComponent],
  imports: [
    CommonModule,
    // RouterModule,
    SharedModule,
    LayoutsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    RichTextEditorAllModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsModule { }
