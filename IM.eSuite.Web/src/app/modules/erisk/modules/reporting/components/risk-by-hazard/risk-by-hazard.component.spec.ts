import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskByHazardComponent } from './risk-by-hazard.component';

describe('RiskByOrganizationComponent', () => {
  let component: RiskByHazardComponent;
  let fixture: ComponentFixture<RiskByHazardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskByHazardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskByHazardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
