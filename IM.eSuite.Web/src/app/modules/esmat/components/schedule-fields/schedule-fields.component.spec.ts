import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleFieldsComponent } from './schedule-fields.component';

describe('SmatFormComponent', () => {
  let component: ScheduleFieldsComponent;
  let fixture: ComponentFixture<ScheduleFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
