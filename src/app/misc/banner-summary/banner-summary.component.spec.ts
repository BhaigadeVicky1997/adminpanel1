import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSummaryComponent } from './banner-summary.component';

describe('BannerSummaryComponent', () => {
  let component: BannerSummaryComponent;
  let fixture: ComponentFixture<BannerSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
