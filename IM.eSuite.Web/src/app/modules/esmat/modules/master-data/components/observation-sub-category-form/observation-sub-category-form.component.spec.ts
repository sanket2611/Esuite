import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationSubCategoryFormComponent } from './observation-sub-category-form.component';

describe('ObservationSubCategoryFormComponent', () => {
  let component: ObservationSubCategoryFormComponent;
  let fixture: ComponentFixture<ObservationSubCategoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationSubCategoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationSubCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
