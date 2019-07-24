import { TestBed, inject } from '@angular/core/testing';

import { SmatService } from './smat.service';

describe('SmatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmatService]
    });
  });

  it('should be created', inject([SmatService], (service: SmatService) => {
    expect(service).toBeTruthy();
  }));
});
