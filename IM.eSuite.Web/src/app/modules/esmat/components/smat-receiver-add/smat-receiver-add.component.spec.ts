import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatReceiverAddComponent } from './smat-receiver-add.component';

describe('SmatReceiverAddComponent', () => {
  let component: SmatReceiverAddComponent;
  let fixture: ComponentFixture<SmatReceiverAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatReceiverAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatReceiverAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
