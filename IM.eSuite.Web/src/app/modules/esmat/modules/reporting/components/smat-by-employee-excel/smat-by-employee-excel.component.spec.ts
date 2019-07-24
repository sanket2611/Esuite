import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatByEmployeeExcelComponent } from './smat-by-employee-excel.component';

describe('SmatByEmployeeExcelComponent', () => {
  let component: SmatByEmployeeExcelComponent;
  let fixture: ComponentFixture<SmatByEmployeeExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatByEmployeeExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatByEmployeeExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
