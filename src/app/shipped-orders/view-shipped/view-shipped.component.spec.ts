import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShippedComponent } from './view-shipped.component';

describe('ViewShippedComponent', () => {
  let component: ViewShippedComponent;
  let fixture: ComponentFixture<ViewShippedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewShippedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewShippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
