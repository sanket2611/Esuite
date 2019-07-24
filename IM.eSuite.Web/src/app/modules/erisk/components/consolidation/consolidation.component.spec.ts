import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidationComponent } from './consolidation.component';

describe('ConsolidationComponent', () => {
  let component: ConsolidationComponent;
  let fixture: ComponentFixture<ConsolidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
