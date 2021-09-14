import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductVariantPictureComponent } from './add-product-variant-picture.component';

describe('AddProductVariantPictureComponent', () => {
  let component: AddProductVariantPictureComponent;
  let fixture: ComponentFixture<AddProductVariantPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductVariantPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductVariantPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
