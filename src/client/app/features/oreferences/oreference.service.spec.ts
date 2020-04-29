import { TestBed } from '@angular/core/testing';

import { OreferenceService } from './oreference.service';

describe('OreferenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OreferenceService = TestBed.get(OreferenceService);
    expect(service).toBeTruthy();
  });
});
