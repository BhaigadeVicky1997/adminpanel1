import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductFlavourComponent } from './update-product-flavour.component';

describe('UpdateProductFlavourComponent', () => {
  let component: UpdateProductFlavourComponent;
  let fixture: ComponentFixture<UpdateProductFlavourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProductFlavourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductFlavourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
