import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationByCategoryComponent } from './observation-by-category.component';

describe('ObservationByCategoryComponent', () => {
  let component: ObservationByCategoryComponent;
  let fixture: ComponentFixture<ObservationByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
