import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidersSummaryComponent } from './sliders-summary.component';

describe('SlidersSummaryComponent', () => {
  let component: SlidersSummaryComponent;
  let fixture: ComponentFixture<SlidersSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidersSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidersSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
