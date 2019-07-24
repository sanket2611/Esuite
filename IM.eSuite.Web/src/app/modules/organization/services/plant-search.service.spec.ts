import { TestBed, inject } from '@angular/core/testing';

import { PlantSearchService } from './plant-search.service';

describe('PlantSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlantSearchService]
    });
  });

  it('should be created', inject([PlantSearchService], (service: PlantSearchService) => {
    expect(service).toBeTruthy();
  }));
});
