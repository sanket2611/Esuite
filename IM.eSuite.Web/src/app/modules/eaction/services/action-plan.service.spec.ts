import { TestBed, inject } from '@angular/core/testing';

import { ActionPlanService } from './action-plan.service';

describe('ActionPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionPlanService]
    });
  });

  it('should be created', inject([ActionPlanService], (service: ActionPlanService) => {
    expect(service).toBeTruthy();
  }));
});
