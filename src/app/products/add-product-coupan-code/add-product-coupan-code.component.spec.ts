import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductCoupanCodeComponent } from './add-product-coupan-code.component';

describe('AddProductCoupanCodeComponent', () => {
  let component: AddProductCoupanCodeComponent;
  let fixture: ComponentFixture<AddProductCoupanCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductCoupanCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductCoupanCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
