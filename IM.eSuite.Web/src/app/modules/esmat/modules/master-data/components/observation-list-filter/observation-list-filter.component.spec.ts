import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationListFilterComponent } from './observation-list-filter.component';

describe('ObservationListFilterComponent', () => {
  let component: ObservationListFilterComponent;
  let fixture: ComponentFixture<ObservationListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
