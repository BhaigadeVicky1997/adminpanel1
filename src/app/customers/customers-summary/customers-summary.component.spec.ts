import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersSummaryComponent } from './customers-summary.component';

describe('CustomersSummaryComponent', () => {
  let component: CustomersSummaryComponent;
  let fixture: ComponentFixture<CustomersSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
