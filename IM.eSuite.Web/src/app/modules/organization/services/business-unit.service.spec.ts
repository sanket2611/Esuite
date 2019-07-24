import { TestBed, inject } from '@angular/core/testing';

import { BusinessUnitService } from './business-unit.service';

describe('BusinessUnitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessUnitService]
    });
  });

  it('should be created', inject([BusinessUnitService], (service: BusinessUnitService) => {
    expect(service).toBeTruthy();
  }));
});
