import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionByStatusComponent } from './action-by-status.component';

describe('ActionByStatusComponent', () => {
  let component: ActionByStatusComponent;
  let fixture: ComponentFixture<ActionByStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionByStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
