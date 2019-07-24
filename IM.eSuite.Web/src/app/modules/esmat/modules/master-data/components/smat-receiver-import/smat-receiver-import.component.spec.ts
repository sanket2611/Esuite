import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatReceiverImportComponent } from './smat-receiver-import.component';

describe('SmatReceiverImportComponent', () => {
  let component: SmatReceiverImportComponent;
  let fixture: ComponentFixture<SmatReceiverImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatReceiverImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatReceiverImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
