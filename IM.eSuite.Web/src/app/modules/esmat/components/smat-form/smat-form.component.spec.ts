import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatFormComponent } from './smat-form.component';

describe('UnscheduledSmatFormComponent', () => {
  let component: SmatFormComponent;
  let fixture: ComponentFixture<SmatFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
