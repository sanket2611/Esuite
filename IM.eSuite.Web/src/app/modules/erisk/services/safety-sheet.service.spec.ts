import { TestBed, inject } from '@angular/core/testing';

import { SafetySheetService } from './safety-sheet.service';

describe('SafetySheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafetySheetService]
    });
  });

  it('should be created', inject([SafetySheetService], (service: SafetySheetService) => {
    expect(service).toBeTruthy();
  }));
});
