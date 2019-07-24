import { TestBed, inject } from '@angular/core/testing';

import { EpiFormService } from './epi-form.service';

describe('HazarFormServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpiFormService]
    });
  });

  it('should be created', inject([EpiFormService], (service: EpiFormService) => {
    expect(service).toBeTruthy();
  }));
});
