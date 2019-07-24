import { TestBed, inject } from '@angular/core/testing';

import { RiskSourceService } from './risk-source.service';

describe('RiskSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RiskSourceService]
    });
  });

  it('should be created', inject([RiskSourceService], (service: RiskSourceService) => {
    expect(service).toBeTruthy();
  }));
});
