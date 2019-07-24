import { TestBed, inject } from '@angular/core/testing';

import { SmatReceiverFieldsService } from './smat-receiver-fields.service';

describe('SmatReceiverFieldsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmatReceiverFieldsService]
    });
  });

  it('should be created', inject([SmatReceiverFieldsService], (service: SmatReceiverFieldsService) => {
    expect(service).toBeTruthy();
  }));
});
