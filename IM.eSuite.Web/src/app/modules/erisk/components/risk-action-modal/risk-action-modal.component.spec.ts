import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskActionModalComponent } from './risk-action-modal.component';

describe('ActionModalComponent', () => {
  let component: RiskActionModalComponent;
  let fixture: ComponentFixture<RiskActionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskActionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
