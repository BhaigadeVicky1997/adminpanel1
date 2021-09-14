import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLocatorSummComponent } from './store-locator-summ.component';

describe('StoreLocatorSummComponent', () => {
  let component: StoreLocatorSummComponent;
  let fixture: ComponentFixture<StoreLocatorSummComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreLocatorSummComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLocatorSummComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
