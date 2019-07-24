import { TestBed, inject } from '@angular/core/testing';

import { ActionFormService } from './action-form.service';

describe('ActionFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionFormService]
    });
  });

  it('should be created', inject([ActionFormService], (service: ActionFormService) => {
    expect(service).toBeTruthy();
  }));
});
