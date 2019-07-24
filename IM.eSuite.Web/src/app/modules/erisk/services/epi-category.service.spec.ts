import { TestBed, inject } from '@angular/core/testing';

import { EpiCategoryService } from './epi-category.service';

describe('EpiCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpiCategoryService]
    });
  });

  it('should be created', inject([EpiCategoryService], (service: EpiCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
