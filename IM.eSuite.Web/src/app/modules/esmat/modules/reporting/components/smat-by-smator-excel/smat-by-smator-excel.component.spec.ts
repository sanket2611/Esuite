import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatBySmatorExcelComponent } from './smat-by-smator-excel.component';

describe('SmatBySmatorExcelComponent', () => {
  let component: SmatBySmatorExcelComponent;
  let fixture: ComponentFixture<SmatBySmatorExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatBySmatorExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatBySmatorExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
