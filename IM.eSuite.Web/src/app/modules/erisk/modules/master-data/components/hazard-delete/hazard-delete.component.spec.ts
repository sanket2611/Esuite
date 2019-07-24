import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardDeleteComponent } from './hazard-delete.component';

describe('HazardDeleteComponent', () => {
  let component: HazardDeleteComponent;
  let fixture: ComponentFixture<HazardDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazardDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
