import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskMoreInformationsFormComponent } from './risk-more-informations-form.component';

describe('RiskMoreInformationsFormComponent', () => {
  let component: RiskMoreInformationsFormComponent;
  let fixture: ComponentFixture<RiskMoreInformationsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskMoreInformationsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskMoreInformationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
