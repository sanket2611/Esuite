import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaiaExportComponent } from './gaia-export.component';

describe('GaiaExportComponent', () => {
  let component: GaiaExportComponent;
  let fixture: ComponentFixture<GaiaExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaiaExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaiaExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
