import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoriesSummaryComponent } from './sub-categories-summary.component';

describe('SubCategoriesSummaryComponent', () => {
  let component: SubCategoriesSummaryComponent;
  let fixture: ComponentFixture<SubCategoriesSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategoriesSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoriesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
