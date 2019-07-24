import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpiCategoryListFilterComponent } from './epi-category-list-filter.component';

describe('EpiCategoryListFilterComponent', () => {
  let component: EpiCategoryListFilterComponent;
  let fixture: ComponentFixture<EpiCategoryListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpiCategoryListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpiCategoryListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
