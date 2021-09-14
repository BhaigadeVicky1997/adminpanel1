import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSlidersComponent } from './view-sliders.component';

describe('ViewSlidersComponent', () => {
  let component: ViewSlidersComponent;
  let fixture: ComponentFixture<ViewSlidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSlidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
