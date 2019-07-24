import { TestBed, inject } from '@angular/core/testing';

import { OrganizationFormService } from './organization-form.service';

describe('OrganizationFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationFormService]
    });
  });

  it('should be created', inject([OrganizationFormService], (service: OrganizationFormService) => {
    expect(service).toBeTruthy();
  }));
});
