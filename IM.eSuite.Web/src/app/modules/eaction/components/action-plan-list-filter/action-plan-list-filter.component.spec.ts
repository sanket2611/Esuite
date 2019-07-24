import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanListFilterComponent } from './action-plan-list-filter.component';

describe('ActionPlanListFilterComponent', () => {
  let component: ActionPlanListFilterComponent;
  let fixture: ComponentFixture<ActionPlanListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionPlanListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlanListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
