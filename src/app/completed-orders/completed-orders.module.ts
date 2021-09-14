import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCompletedComponent } from './view-completed/view-completed.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


const routes: Routes = [
  { path: 'view-completed-orders', component: ViewCompletedComponent }

];
@NgModule({
  declarations: [ViewCompletedComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LayoutsModule,
    NgxPaginationModule,
    FormsModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes)
  ]
})
export class CompletedOrdersModule { }
