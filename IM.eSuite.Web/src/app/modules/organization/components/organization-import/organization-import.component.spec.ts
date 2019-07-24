import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationImportComponent } from './organization-import.component';

describe('OrganizationImportComponent', () => {
  let component: OrganizationImportComponent;
  let fixture: ComponentFixture<OrganizationImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
