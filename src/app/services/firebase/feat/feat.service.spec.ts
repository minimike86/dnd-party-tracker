import { TestBed } from '@angular/core/testing';

import { FeatService } from './feat.service';

describe('FeatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeatService = TestBed.get(FeatService);
    expect(service).toBeTruthy();
  });
});
