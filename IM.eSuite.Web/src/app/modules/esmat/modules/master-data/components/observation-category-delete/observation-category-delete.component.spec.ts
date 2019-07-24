import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationCategoryDeleteComponent } from './observation-category-delete.component';

describe('ObservationCategoryDeleteComponent', () => {
  let component: ObservationCategoryDeleteComponent;
  let fixture: ComponentFixture<ObservationCategoryDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationCategoryDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationCategoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
