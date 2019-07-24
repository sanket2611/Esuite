import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationByTypeAndMonthComponent } from './observation-by-type-and-month.component';

describe('ObservationByTypeAndMonthComponent', () => {
  let component: ObservationByTypeAndMonthComponent;
  let fixture: ComponentFixture<ObservationByTypeAndMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationByTypeAndMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationByTypeAndMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
