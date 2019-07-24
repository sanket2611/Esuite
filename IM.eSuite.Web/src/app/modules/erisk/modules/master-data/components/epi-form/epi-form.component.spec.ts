import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpiFormComponent } from './epi-form.component';

describe('EpiFormComponent', () => {
  let component: EpiFormComponent;
  let fixture: ComponentFixture<EpiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
