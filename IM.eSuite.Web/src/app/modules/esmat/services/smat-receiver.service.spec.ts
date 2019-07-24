import { TestBed, inject } from '@angular/core/testing';

import { SmatReceiverService } from './smat-receiver.service';

describe('SmatReceiverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmatReceiverService]
    });
  });

  it('should be created', inject([SmatReceiverService], (service: SmatReceiverService) => {
    expect(service).toBeTruthy();
  }));
});