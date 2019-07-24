import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDescriptionAddComponent } from './language-description-add.component';

describe('LanguageDescriptionAddComponent', () => {
  let component: LanguageDescriptionAddComponent;
  let fixture: ComponentFixture<LanguageDescriptionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageDescriptionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageDescriptionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
