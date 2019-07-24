import { TestBed, inject } from '@angular/core/testing';

import { SmatFormService } from './smat-form.service';

describe('SmatFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmatFormService]
    });
  });

  it('should be created', inject([SmatFormService], (service: SmatFormService) => {
    expect(service).toBeTruthy();
  }));
});
