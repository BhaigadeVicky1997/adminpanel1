import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupanCodeSummaryComponent } from './coupan-code-summary.component';

describe('CoupanCodeSummaryComponent', () => {
  let component: CoupanCodeSummaryComponent;
  let fixture: ComponentFixture<CoupanCodeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoupanCodeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoupanCodeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
