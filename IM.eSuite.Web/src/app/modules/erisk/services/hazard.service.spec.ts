import { TestBed, inject } from '@angular/core/testing';

import { HazardService } from './hazard.service';

describe('HazardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HazardService]
    });
  });

  it('should be created', inject([HazardService], (service: HazardService) => {
    expect(service).toBeTruthy();
  }));
});
