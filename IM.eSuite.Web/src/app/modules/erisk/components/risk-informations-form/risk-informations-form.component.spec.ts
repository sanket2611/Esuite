import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskInformationsFormComponent } from './risk-informations-form.component';

describe('RiskInformationsFormComponent', () => {
  let component: RiskInformationsFormComponent;
  let fixture: ComponentFixture<RiskInformationsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskInformationsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskInformationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
