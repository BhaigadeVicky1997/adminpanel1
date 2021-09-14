import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';
import { LayoutsModule } from '../layouts/layouts.module';
const routes: Routes = [
  { path: 'view-dashboard', component: ViewDashboardComponent },
 

];
@NgModule({
  declarations: [ViewDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LayoutsModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
