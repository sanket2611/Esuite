import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatRootComponent } from './smat-root.component';

describe('SmatRootComponent', () => {
  let component: SmatRootComponent;
  let fixture: ComponentFixture<SmatRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
