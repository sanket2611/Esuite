import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDescriptionDeleteComponent } from './language-description-delete.component';

describe('LanguageDescriptionDeleteComponent', () => {
  let component: LanguageDescriptionDeleteComponent;
  let fixture: ComponentFixture<LanguageDescriptionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageDescriptionDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageDescriptionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
