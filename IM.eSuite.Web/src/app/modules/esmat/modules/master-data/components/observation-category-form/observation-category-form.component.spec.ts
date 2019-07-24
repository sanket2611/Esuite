import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationCategoryFormComponent } from './observation-category-form.component';

describe('ObservationCategoryFormComponent', () => {
  let component: ObservationCategoryFormComponent;
  let fixture: ComponentFixture<ObservationCategoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationCategoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
