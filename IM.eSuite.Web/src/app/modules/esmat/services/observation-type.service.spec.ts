import { TestBed, inject } from '@angular/core/testing';

import { ObservationTypeService } from './observation-type.service';

describe('ObservationTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObservationTypeService]
    });
  });

  it('should be created', inject([ObservationTypeService], (service: ObservationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
