import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskRootComponent } from './risk-root.component';

describe('RiskRootComponent', () => {
  let component: RiskRootComponent;
  let fixture: ComponentFixture<RiskRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
