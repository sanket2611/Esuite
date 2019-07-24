import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFieldsComponent } from './location-fields.component';

describe('LocationFieldsComponent', () => {
  let component: LocationFieldsComponent;
  let fixture: ComponentFixture<LocationFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
