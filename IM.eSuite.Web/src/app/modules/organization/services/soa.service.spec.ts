import { TestBed, inject } from '@angular/core/testing';

import { SoaService } from './soa.service';

describe('SoaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoaService]
    });
  });

  it('should be created', inject([SoaService], (service: SoaService) => {
    expect(service).toBeTruthy();
  }));
});
