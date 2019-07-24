import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskControlFormComponent } from './risk-control-form.component';

describe('RiskControlFormComponent', () => {
  let component: RiskControlFormComponent;
  let fixture: ComponentFixture<RiskControlFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskControlFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskControlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
