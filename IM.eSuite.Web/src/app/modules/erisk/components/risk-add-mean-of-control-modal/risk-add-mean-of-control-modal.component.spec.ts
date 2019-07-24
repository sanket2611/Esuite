import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAddMeanOfControlModalComponent } from './risk-add-mean-of-control-modal.component';

describe('RiskAddOrganizationFormationComponent', () => {
  let component: RiskAddMeanOfControlModalComponent;
  let fixture: ComponentFixture<RiskAddMeanOfControlModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskAddMeanOfControlModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskAddMeanOfControlModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
