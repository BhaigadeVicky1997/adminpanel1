import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FranchiseFormComponent } from './franchise-form/franchise-form.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { StoreLocatorComponent } from './store-locator/store-locator.component';
import { AddStoreLocatorComponent } from './add-store-locator/add-store-locator.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { BannerComponent } from './banner/banner.component';
import { StaffComponent } from './staff/staff.component';
import { StoreLocatorSummComponent } from './store-locator-summ/store-locator-summ.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { BannerSummaryComponent } from './banner-summary/banner-summary.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ReactiveFormsModule } from '@angular/forms';
import { ViewSlidersComponent } from './view-sliders/view-sliders.component';
import { AddSlidersComponent } from './add-sliders/add-sliders.component';
import { SlidersSummaryComponent } from './sliders-summary/sliders-summary.component';
import { ExcelService } from '../service/excel.service';


const routes: Routes = [
  { path: 'view-franchise-form', component: FranchiseFormComponent },
  { path: 'view-contact-form', component: ContactFormComponent },
  { path: 'view-subscription-form', component: SubscriptionComponent },
  { path: 'view-store-locator', component: StoreLocatorComponent },
  { path: 'add-store-locator', component: AddStoreLocatorComponent },
  { path: 'store-locator-summary/:id', component: StoreLocatorSummComponent },
  { path: 'view-banner', component: BannerComponent },
  { path: 'add-banner', component: AddBannerComponent },
  { path: 'add-banner', component: AddBannerComponent },
  { path: 'banner-summary/:id', component: BannerSummaryComponent },
  { path: 'view-sliders', component: ViewSlidersComponent },
  { path: 'add-sliders', component: AddSlidersComponent },
  { path: 'slider-summary/:id', component: SlidersSummaryComponent },
];
@NgModule({
  declarations: [FranchiseFormComponent, ContactFormComponent, SubscriptionComponent, StoreLocatorComponent, AddStoreLocatorComponent, BannerComponent, StaffComponent, StoreLocatorSummComponent, AddBannerComponent, BannerSummaryComponent, ViewSlidersComponent, AddSlidersComponent, SlidersSummaryComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LayoutsModule,
    RichTextEditorAllModule,
    NgxPaginationModule,
    FormsModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ExcelService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MiscModule { }
