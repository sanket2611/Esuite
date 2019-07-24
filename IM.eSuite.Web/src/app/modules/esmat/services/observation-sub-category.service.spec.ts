import { TestBed, inject } from '@angular/core/testing';

import { ObservationSubCategoryService } from './observation-sub-category.service';

describe('ObservationSubCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObservationSubCategoryService]
    });
  });

  it('should be created', inject([ObservationSubCategoryService], (service: ObservationSubCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
