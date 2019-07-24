import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFieldsComponent } from './action-fields.component';

describe('ActionFieldsComponent', () => {
  let component: ActionFieldsComponent;
  let fixture: ComponentFixture<ActionFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
