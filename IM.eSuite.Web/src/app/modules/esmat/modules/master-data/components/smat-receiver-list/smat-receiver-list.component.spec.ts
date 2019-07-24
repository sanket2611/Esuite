import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatReceiverListComponent } from './smat-receiver-list.component';

describe('SmatReceiverListComponent', () => {
  let component: SmatReceiverListComponent;
  let fixture: ComponentFixture<SmatReceiverListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatReceiverListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatReceiverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
