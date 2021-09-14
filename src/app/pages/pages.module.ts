import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../shared/ui/ui.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
  declarations: [DashboardComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    NgbDropdownModule,
    UIModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
