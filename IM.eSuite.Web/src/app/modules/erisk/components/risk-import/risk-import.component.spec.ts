import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskImportComponent } from './risk-import.component';

describe('RiskImportComponent', () => {
  let component: RiskImportComponent;
  let fixture: ComponentFixture<RiskImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
