import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoupanComponent } from './view-coupan.component';

describe('ViewCoupanComponent', () => {
  let component: ViewCoupanComponent;
  let fixture: ComponentFixture<ViewCoupanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCoupanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoupanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
