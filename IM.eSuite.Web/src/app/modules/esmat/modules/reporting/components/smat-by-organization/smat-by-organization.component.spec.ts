import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmatByOrganizationComponent } from './smat-by-organization.component';

describe('SmatByOrganizationComponent', () => {
  let component: SmatByOrganizationComponent;
  let fixture: ComponentFixture<SmatByOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatByOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatByOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
