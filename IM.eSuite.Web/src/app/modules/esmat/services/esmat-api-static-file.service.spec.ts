import { TestBed, inject } from '@angular/core/testing';

import { eSmatApiStaticFileService } from './esmat-api-static-file.service';

describe('eSmatApiStaticFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [eSmatApiStaticFileService]
    });
  });

  it('should be created', inject([eSmatApiStaticFileService], (service: eSmatApiStaticFileService) => {
    expect(service).toBeTruthy();
  }));
});
