import { TestBed, inject } from '@angular/core/testing';

import { EsmatActionPlanService } from './esmat-action-plan.service';

describe('EsmatActionPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsmatActionPlanService]
    });
  });

  it('should be created', inject([EsmatActionPlanService], (service: EsmatActionPlanService) => {
    expect(service).toBeTruthy();
  }));
});
