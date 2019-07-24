import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskSituationFormComponent } from './risk-situation-form.component';

describe('RiskSituationFormComponent', () => {
  let component: RiskSituationFormComponent;
  let fixture: ComponentFixture<RiskSituationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskSituationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskSituationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
