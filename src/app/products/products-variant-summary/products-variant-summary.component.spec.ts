import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsVariantSummaryComponent } from './products-variant-summary.component';

describe('ProductsVariantSummaryComponent', () => {
  let component: ProductsVariantSummaryComponent;
  let fixture: ComponentFixture<ProductsVariantSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsVariantSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsVariantSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
