import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatReceiverFormComponent } from './smat-receiver-form.component';

describe('SmatReceiverFormComponent', () => {
  let component: SmatReceiverFormComponent;
  let fixture: ComponentFixture<SmatReceiverFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatReceiverFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatReceiverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
