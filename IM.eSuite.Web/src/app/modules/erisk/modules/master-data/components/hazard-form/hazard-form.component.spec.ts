import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardFormComponent } from './hazard-form.component';

describe('HazardFormComponent', () => {
  let component: HazardFormComponent;
  let fixture: ComponentFixture<HazardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
