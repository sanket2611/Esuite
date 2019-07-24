import { TestBed, inject } from '@angular/core/testing';

import { ConsolidationService } from './consolidation.service';

describe('ConsolidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsolidationService]
    });
  });

  it('should be created', inject([ConsolidationService], (service: ConsolidationService) => {
    expect(service).toBeTruthy();
  }));
});
