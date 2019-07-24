import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseRootComponent } from './base-root.component';

describe('RootComponent', () => {
  let component: BaseRootComponent;
  let fixture: ComponentFixture<BaseRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
