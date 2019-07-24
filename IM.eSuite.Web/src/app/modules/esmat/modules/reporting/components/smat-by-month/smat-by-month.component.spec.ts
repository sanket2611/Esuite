import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatByMonthComponent } from './smat-by-month.component';

describe('SmatByMonthComponent', () => {
  let component: SmatByMonthComponent;
  let fixture: ComponentFixture<SmatByMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatByMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
