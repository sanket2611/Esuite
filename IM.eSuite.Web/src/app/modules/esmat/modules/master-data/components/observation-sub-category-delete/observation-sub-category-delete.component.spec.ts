import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationSubCategoryDeleteComponent } from './observation-sub-category-delete.component';

describe('ObservationSubCategoryDeleteComponent', () => {
  let component: ObservationSubCategoryDeleteComponent;
  let fixture: ComponentFixture<ObservationSubCategoryDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationSubCategoryDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationSubCategoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
