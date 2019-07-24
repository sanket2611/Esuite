import { TestBed, inject } from '@angular/core/testing';

import { ObservationCategoryFormService } from './observation-category-form.service';

describe('ObservationCategoryFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObservationCategoryFormService]
    });
  });

  it('should be created', inject([ObservationCategoryFormService], (service: ObservationCategoryFormService) => {
    expect(service).toBeTruthy();
  }));
});
