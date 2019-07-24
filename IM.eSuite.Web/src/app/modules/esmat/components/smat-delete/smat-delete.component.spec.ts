import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatDeleteComponent } from './smat-delete.component';

describe('SmatDeleteComponent', () => {
  let component: SmatDeleteComponent;
  let fixture: ComponentFixture<SmatDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
