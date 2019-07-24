import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskByOrganizationComponent } from './risk-by-organization.component';

describe('RiskByOrganizationComponent', () => {
  let component: RiskByOrganizationComponent;
  let fixture: ComponentFixture<RiskByOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskByOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskByOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
