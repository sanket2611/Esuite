import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SmatReceiverFieldsComponent } from './smat-receiver-fields.component';

describe('SmatReceiverFormComponent', () => {
  let component: SmatReceiverFieldsComponent;
  let fixture: ComponentFixture<SmatReceiverFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatReceiverFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatReceiverFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
