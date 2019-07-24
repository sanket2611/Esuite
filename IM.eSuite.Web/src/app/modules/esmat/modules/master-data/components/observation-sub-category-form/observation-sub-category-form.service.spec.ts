import { TestBed, inject } from '@angular/core/testing';

import { ObservationSubCategoryFormService } from './observation-sub-category-form.service';

describe('ObservationSubCategoryFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObservationSubCategoryFormService]
    });
  });

  it('should be created', inject([ObservationSubCategoryFormService], (service: ObservationSubCategoryFormService) => {
    expect(service).toBeTruthy();
  }));
});
