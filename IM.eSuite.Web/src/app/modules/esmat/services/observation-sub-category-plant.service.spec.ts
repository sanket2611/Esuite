import { TestBed, inject } from '@angular/core/testing';

import { ObservationSubCategoryPlantService } from './observation-sub-category-plant.service';

describe('ObservationSubCategoryPlantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObservationSubCategoryPlantService]
    });
  });

  it('should be created', inject([ObservationSubCategoryPlantService], (service: ObservationSubCategoryPlantService) => {
    expect(service).toBeTruthy();
  }));
});
