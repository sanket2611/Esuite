import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatReceiverDeleteComponent } from './smat-receiver-delete.component';

describe('SmatReceiverDeleteComponent', () => {
  let component: SmatReceiverDeleteComponent;
  let fixture: ComponentFixture<SmatReceiverDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatReceiverDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatReceiverDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
