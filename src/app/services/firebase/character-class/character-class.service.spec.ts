import { TestBed } from '@angular/core/testing';

import { CharacterClassService } from './character-class.service';

describe('CharacterClassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharacterClassService = TestBed.get(CharacterClassService);
    expect(service).toBeTruthy();
  });
});
