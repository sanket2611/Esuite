import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRootComponent } from './action-root.component';

describe('ActionRootComponent', () => {
  let component: ActionRootComponent;
  let fixture: ComponentFixture<ActionRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
