import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationSubCategoryTableComponent } from './observation-sub-category-table.component';

describe('ObservationSubCategoryTableComponent', () => {
  let component: ObservationSubCategoryTableComponent;
  let fixture: ComponentFixture<ObservationSubCategoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationSubCategoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationSubCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
