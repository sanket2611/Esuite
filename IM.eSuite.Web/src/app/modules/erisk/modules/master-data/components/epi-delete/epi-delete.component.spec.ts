import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpiDeleteComponent } from './epi-delete.component';

describe('EpiDeleteComponent', () => {
  let component: EpiDeleteComponent;
  let fixture: ComponentFixture<EpiDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpiDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpiDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
