import { TestBed, inject } from '@angular/core/testing';

import { eSuiteApiStaticFileService } from './esuite-api-static-file.service';

describe('eSuiteApiStaticFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [eSuiteApiStaticFileService]
    });
  });

  it('should be created', inject([eSuiteApiStaticFileService], (service: eSuiteApiStaticFileService) => {
    expect(service).toBeTruthy();
  }));
});
