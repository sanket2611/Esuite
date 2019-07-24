import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledSmatDeleteComponent } from './scheduled-smat-delete.component';

describe('ScheduledSmatDeleteComponent', () => {
  let component: ScheduledSmatDeleteComponent;
  let fixture: ComponentFixture<ScheduledSmatDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledSmatDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledSmatDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
