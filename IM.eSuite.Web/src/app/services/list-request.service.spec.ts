import { TestBed, inject } from '@angular/core/testing';

import { ListRequestService } from './list-request.service';

describe('ListRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListRequestService]
    });
  });

  it('should be created', inject([ListRequestService], (service: ListRequestService) => {
    expect(service).toBeTruthy();
  }));
});
