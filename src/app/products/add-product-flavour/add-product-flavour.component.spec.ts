import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductFlavourComponent } from './add-product-flavour.component';

describe('AddProductFlavourComponent', () => {
  let component: AddProductFlavourComponent;
  let fixture: ComponentFixture<AddProductFlavourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductFlavourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductFlavourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
