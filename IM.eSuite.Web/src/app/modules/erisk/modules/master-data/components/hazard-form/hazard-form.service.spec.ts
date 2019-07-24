import { TestBed, inject } from '@angular/core/testing';

import { HazardFormService } from './hazard-form.service';

describe('HazarFormServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HazardFormService]
    });
  });

  it('should be created', inject([HazardFormService], (service: HazardFormService) => {
    expect(service).toBeTruthy();
  }));
});
