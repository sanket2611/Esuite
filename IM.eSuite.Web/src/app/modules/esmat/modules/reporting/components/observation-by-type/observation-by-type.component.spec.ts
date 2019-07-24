import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationByTypeComponent } from './observation-by-type.component';

describe('ObservationByTypeComponent', () => {
  let component: ObservationByTypeComponent;
  let fixture: ComponentFixture<ObservationByTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationByTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
