import { TestBed, inject } from '@angular/core/testing';

import { EpiService } from './epi.service';

describe('EpiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpiService]
    });
  });

  it('should be created', inject([EpiService], (service: EpiService) => {
    expect(service).toBeTruthy();
  }));
});
