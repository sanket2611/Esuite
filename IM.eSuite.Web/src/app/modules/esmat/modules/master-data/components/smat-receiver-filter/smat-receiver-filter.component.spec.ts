import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatReceiverFilterComponent } from './smat-receiver-filter.component';

describe('SmatReceiverFilterComponent', () => {
  let component: SmatReceiverFilterComponent;
  let fixture: ComponentFixture<SmatReceiverFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatReceiverFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatReceiverFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
