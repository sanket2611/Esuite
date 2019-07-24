import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringByOrganizationComponent } from './scoring-by-organization.component';

describe('RiskByOrganizationComponent', () => {
  let component: ScoringByOrganizationComponent;
  let fixture: ComponentFixture<ScoringByOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoringByOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringByOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
