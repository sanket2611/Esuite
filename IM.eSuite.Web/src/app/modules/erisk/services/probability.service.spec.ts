import { TestBed, inject } from '@angular/core/testing';

import { ProbabilityService } from './probability.service';

describe('ProbabilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProbabilityService]
    });
  });

  it('should be created', inject([ProbabilityService], (service: ProbabilityService) => {
    expect(service).toBeTruthy();
  }));
});
