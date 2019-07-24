import { TestBed, inject } from '@angular/core/testing';

import { MeanOfControlService } from './mean-of-control.service';

describe('MeanOfControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeanOfControlService]
    });
  });

  it('should be created', inject([MeanOfControlService], (service: MeanOfControlService) => {
    expect(service).toBeTruthy();
  }));
});
