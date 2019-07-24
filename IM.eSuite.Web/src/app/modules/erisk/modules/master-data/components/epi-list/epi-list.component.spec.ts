import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpiListComponent } from './epi-list.component';

describe('EpiListComponent', () => {
  let component: EpiListComponent;
  let fixture: ComponentFixture<EpiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
