import { TestBed, inject } from '@angular/core/testing';

import { ScheduleFormService } from './schedule-form.service';

describe('ScheduledSmatFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleFormService]
    });
  });

  it('should be created', inject([ScheduleFormService], (service: ScheduleFormService) => {
    expect(service).toBeTruthy();
  }));
});
