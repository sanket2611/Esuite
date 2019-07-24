import { TestBed, inject } from '@angular/core/testing';

import { ObservationCategoryService } from './observation-category.service';

describe('ObservationCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObservationCategoryService]
    });
  });

  it('should be created', inject([ObservationCategoryService], (service: ObservationCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
