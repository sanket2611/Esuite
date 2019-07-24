import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatByEmployeeComponent } from './smat-by-employee.component';

describe('SmatByEmployeeComponent', () => {
  let component: SmatByEmployeeComponent;
  let fixture: ComponentFixture<SmatByEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatByEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatByEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
