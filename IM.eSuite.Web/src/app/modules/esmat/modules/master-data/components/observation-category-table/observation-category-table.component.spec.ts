import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationCategoryTableComponent } from './observation-category-table.component';

describe('ObservationCategoryTableComponent', () => {
  let component: ObservationCategoryTableComponent;
  let fixture: ComponentFixture<ObservationCategoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationCategoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
