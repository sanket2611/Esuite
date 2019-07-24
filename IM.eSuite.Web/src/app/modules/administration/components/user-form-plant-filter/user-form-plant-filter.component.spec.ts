import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormPlantFilterComponent } from './user-form-plant-filter.component';

describe('UserFormPlantFilterComponent', () => {
  let component: UserFormPlantFilterComponent;
  let fixture: ComponentFixture<UserFormPlantFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormPlantFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormPlantFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
