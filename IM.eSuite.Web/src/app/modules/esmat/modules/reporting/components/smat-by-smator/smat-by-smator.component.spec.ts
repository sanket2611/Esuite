import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatBySmatorComponent } from './smat-by-smator.component';

describe('SmatBySmatorComponent', () => {
  let component: SmatBySmatorComponent;
  let fixture: ComponentFixture<SmatBySmatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatBySmatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatBySmatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
