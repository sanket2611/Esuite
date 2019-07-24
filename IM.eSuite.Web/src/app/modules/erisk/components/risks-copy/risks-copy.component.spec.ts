import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RisksCopyComponent } from './risks-copy.component';

describe('RisksCopyComponent', () => {
  let component: RisksCopyComponent;
  let fixture: ComponentFixture<RisksCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RisksCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RisksCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
