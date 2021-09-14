import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoreLocatorComponent } from './add-store-locator.component';

describe('AddStoreLocatorComponent', () => {
  let component: AddStoreLocatorComponent;
  let fixture: ComponentFixture<AddStoreLocatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStoreLocatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoreLocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
