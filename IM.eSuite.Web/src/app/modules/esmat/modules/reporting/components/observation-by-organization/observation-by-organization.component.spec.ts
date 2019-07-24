import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationByOrganizationComponent } from './observation-by-organization.component';

describe('ObservationByOrganizationComponent', () => {
  let component: ObservationByOrganizationComponent;
  let fixture: ComponentFixture<ObservationByOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationByOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationByOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
