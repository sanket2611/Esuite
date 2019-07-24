import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskEvaluationDateComponent } from './risk-evaluation-date.component';

describe('RiskEvaluationDateComponent', () => {
  let component: RiskEvaluationDateComponent;
  let fixture: ComponentFixture<RiskEvaluationDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskEvaluationDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskEvaluationDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
