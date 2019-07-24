import { TestBed, inject } from '@angular/core/testing';

import { PlantFormService } from './plant-form.service';

describe('PlantFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlantFormService]
    });
  });

  it('should be created', inject([PlantFormService], (service: PlantFormService) => {
    expect(service).toBeTruthy();
  }));
});
