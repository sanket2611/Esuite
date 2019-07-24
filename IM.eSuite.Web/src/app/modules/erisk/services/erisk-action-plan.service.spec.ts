import { TestBed, inject } from '@angular/core/testing';

import { EriskActionPlanService } from './erisk-action-plan.service';

describe('EriskActionPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EriskActionPlanService]
    });
  });

  it('should be created', inject([EriskActionPlanService], (service: EriskActionPlanService) => {
    expect(service).toBeTruthy();
  }));
});
